# Codex Skills

Project-level skill configuration for AI-assisted development in **laohu-tsumtsum 🐯**.

## refactor-physics-loop

**Description:** Refactor the physics, collision detection, collision resolution, and settling loops used by Tsum entities.

**Use when:**
- Physics updates are unstable, slow, duplicated, or difficult to reason about.
- Collision resolution risks infinite loops or excessive frame time.
- Falling, spawning, settling, or overlap handling needs to be changed.

**Workflow:**
1. Locate the current physics update, collision detection, and collision resolution phases.
2. Split mixed responsibilities into fixed update, broad/narrow collision checks, resolution, and state commit steps.
3. Add capped iteration counts, movement epsilon checks, and large-delta clamping.
4. Preserve gameplay behavior unless the requested task explicitly changes it.
5. Verify dense spawn, overlap, refill, and pause/resume scenarios.

**Guardrails:**
- Do not put rendering logic inside the physics loop.
- Do not introduce unbounded loops.
- Do not use `any`.

## add-tsum-character

**Description:** Quickly add or update a Tsum character configuration, including asset references, display metadata, alignment, and gameplay tuning.

**Use when:**
- A new Tsum character, icon, portrait, or gameplay profile is needed.
- Existing character alignment, radius, visual offset, or catalog data needs adjustment.
- Asset catalogs and character configuration must stay consistent.

**Workflow:**
1. Inspect the existing character catalog, asset list, and alignment configuration.
2. Add the new character through the same data shape used by existing Tsums.
3. Configure image paths, display name, radius, scale, offsets, and optional gameplay tags.
4. Avoid hard-coding character behavior inside gameplay systems.
5. Verify the character appears correctly in spawn, collection, linking, and clearing states.

**Guardrails:**
- Keep character data data-driven.
- Reuse existing asset conventions.
- Do not modify unrelated characters unless requested.

## optimize-canvas-performance

**Description:** Detect and optimize Canvas memory leaks, excessive allocations, overdraw, and rendering bottlenecks.

**Use when:**
- Frame rate drops during linking, falling, clearing, or collection rendering.
- Memory grows over time after repeated games or scene resets.
- Canvas rendering feels slow on mobile or high-DPI screens.

**Workflow:**
1. Inspect requestAnimationFrame usage, canvas sizing, asset caching, and draw-call flow.
2. Identify hot paths with repeated allocations, redundant state changes, or unnecessary redraws.
3. Reuse temporary objects, cached images, paths, gradients, and measurement results where safe.
4. Ensure listeners, timers, and animation frames are cleaned up on reset or teardown.
5. Verify desktop and mobile rendering after optimization.

**Guardrails:**
- Preserve visual behavior unless the requested task changes it.
- Do not trade correctness for micro-optimizations.
- Keep rendering separate from physics and game-state mutation.
