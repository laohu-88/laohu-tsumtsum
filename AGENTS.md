# AGENTS.md

This file gives AI coding agents project-specific rules for laohu-tsumtsum.

## Project Context

- Root project: laohu-tsumtsum
- Domain: Disney Tsum Tsum-style match-and-clear game
- Primary stack: TypeScript, Canvas 2D, HTML, CSS
- Runtime target: browser, mobile-friendly, PWA-friendly
- Core systems: physics falling, collision detection, drag linking, chain clearing, score feedback

## Agent Workflow

- Read the existing game loop, render path, and asset configuration before editing.
- Keep changes small and directly related to the requested task.
- Preserve user-created assets, sounds, manifests, and generated catalogs.
- Do not rewrite unrelated files or reset Git history.
- Prefer data-driven character configuration over hard-coded character logic.

## TypeScript Rules

- Use strict TypeScript types for game state, entities, vectors, timers, and assets.
- Do not use `any`; use explicit interfaces, unions, generics, or `unknown` with narrowing.
- Avoid implicit globals and shared mutable state.
- Keep public function signatures stable unless the task requires an API change.
- Use exhaustive checks for game modes, entity states, and input states.

## Canvas And Rendering

- Separate rendering from physics and game-state updates.
- Rendering functions should draw from immutable frame snapshots where practical.
- Do not perform collision resolution inside draw functions.
- Minimize per-frame allocations in hot render paths.
- Reuse Canvas gradients, paths, image references, and temporary vectors when safe.
- Always account for devicePixelRatio and responsive canvas sizing.

## Physics Loop Rules

- Keep physics integration, collision detection, and collision resolution as separate phases.
- Use a fixed timestep or capped delta time for stability.
- Clamp large frame deltas after tab switching or device wake.
- Add iteration caps to collision and settling loops.
- Break out when no bodies move beyond the movement epsilon.
- Never introduce unbounded `while` loops in physics, collision, spawning, or settling code.
- Track max iterations, remaining unresolved collisions, and fallback behavior when loops cap out.

## Performance Guidance

- Profile before broad rewrites when a performance issue is unclear.
- Watch for memory leaks from event listeners, timers, animation frames, image caches, and arrays that grow forever.
- Avoid creating new objects inside pointer-move, animation, and collision loops unless measured as harmless.
- Batch Canvas state changes and draw calls where possible.
- Prefer requestAnimationFrame for visual updates.
- Cancel animation frames and remove listeners during teardown or scene reset.

## Testing And Verification

- Run the smallest useful verification after edits.
- For gameplay changes, test linking, clearing, falling, refill, pause/resume, and mobile pointer input.
- For rendering changes, verify desktop and mobile canvas sizing.
- For physics changes, verify no infinite loop when many Tsums overlap or spawn at once.
- Document any verification that could not be run.

## Documentation

- Keep README and agent docs bilingual when user-facing context is involved.
- Keep comments short and useful.
- Add comments only for non-obvious physics, timing, or rendering decisions.
