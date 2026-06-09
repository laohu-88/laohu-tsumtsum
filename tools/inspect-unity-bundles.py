import argparse
import io
import json
import re
import zipfile

import UnityPy


def load_manifest(apk):
    with zipfile.ZipFile(apk) as zf:
        manifest_name = next(
            name for name in zf.namelist()
            if name.startswith("assets/assetBundles/asset.") and name.endswith(".json")
        )
        with zf.open(manifest_name) as fp:
            return json.load(fp)


def iter_bundle_entries(apk, pattern, limit):
    manifest = load_manifest(apk)
    rx = re.compile(pattern, re.I)
    count = 0
    for bundle in manifest.get("bundle", []):
        haystack = "\n".join([bundle.get("filename", ""), *bundle.get("asset", [])])
        if not rx.search(haystack):
            continue
        yield bundle
        count += 1
        if limit and count >= limit:
            return


def read_bundle(zf, filename):
    entry_name = "assets/" + filename
    with zf.open(entry_name) as fp:
        return fp.read()


def object_summary(obj):
    typ = obj.type.name
    try:
        data = obj.read()
    except Exception as exc:
        return {"type": typ, "error": str(exc)}

    item = {"type": typ, "name": getattr(data, "name", "")}
    if typ == "Texture2D":
        item.update({"width": getattr(data, "m_Width", None), "height": getattr(data, "m_Height", None)})
    elif typ == "Sprite":
        rect = getattr(data, "m_Rect", None)
        if rect:
            item.update({"width": getattr(rect, "width", None), "height": getattr(rect, "height", None)})
    return item


def inspect_bundle(apk, pattern, limit, object_limit):
    results = []
    with zipfile.ZipFile(apk) as zf:
        entry_names = set(zf.namelist())
        for bundle in iter_bundle_entries(apk, pattern, limit):
            entry_name = "assets/" + bundle["filename"]
            if entry_name not in entry_names:
                results.append({
                    "filename": bundle["filename"],
                    "assets": bundle.get("asset", []),
                    "presentInApk": False,
                    "objects": [],
                })
                continue
            payload = read_bundle(zf, bundle["filename"])
            env = UnityPy.load(io.BytesIO(payload))
            objects = []
            for obj in env.objects:
                if obj.type.name not in {"Texture2D", "Sprite", "MonoBehaviour", "GameObject"}:
                    continue
                objects.append(object_summary(obj))
                if object_limit and len(objects) >= object_limit:
                    break
            results.append({
                "filename": bundle["filename"],
                "assets": bundle.get("asset", []),
                "presentInApk": True,
                "objects": objects,
            })
    return results


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apk", default="Original/tsumtsum.apk")
    parser.add_argument("--pattern", required=True)
    parser.add_argument("--limit", type=int, default=5)
    parser.add_argument("--object-limit", type=int, default=40)
    args = parser.parse_args()
    print(json.dumps(inspect_bundle(args.apk, args.pattern, args.limit, args.object_limit), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
