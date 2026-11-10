# LESSONS - auto-maintained by scripts/lessons.py

> Machine-owned. Do NOT hand-edit. Changes are overwritten on the next `lessons.py` write.
> Canonical state lives in `.specs/lessons.json`. Edit lessons only via the script.
> promote_threshold=2 distinct features · window_days=45 · quarantine_threshold=2

## Confirmed (load these at Plan/Checks)

Corroborated across multiple features. Safe to apply as guidance.

_none_

## Candidates (under observation - do NOT load as guidance yet)

Seen once or not yet corroborated. Tracked, not trusted.

### L-001 - Count and list children with Children.toArray so false, null and undefined children are not counted or rendered
- signal: `ac_gap` · recurrence: 1 feature(s) · scope: `components` · harmful: 0
- features: 01-foundation
- evidence: apps/web/src/components/ui/shelf.tsx:27 (components)
- last seen: 2026-11-10T19:10:41Z

### L-002 - Type a prop as string when it also builds an accessible name, and guard the type with ts-expect-error
- signal: `ac_gap` · recurrence: 1 feature(s) · scope: `components` · harmful: 0
- features: 01-foundation
- evidence: apps/web/src/components/ui/shelf.tsx:28 (components)
- last seen: 2026-11-10T19:10:41Z

### L-003 - Clamp numeric index props after flooring them and treating NaN as zero
- signal: `ac_gap` · recurrence: 1 feature(s) · scope: `components` · harmful: 0
- features: 01-foundation
- evidence: apps/web/src/components/ui/stepper.tsx:28 (components)
- last seen: 2026-11-10T19:10:41Z

### L-004 - Test a length threshold exactly at the boundary and one below it, after trimming
- signal: `weak_test` · recurrence: 1 feature(s) · scope: `tests` · harmful: 0
- features: 01-foundation
- evidence: C38 (tests)
- last seen: 2026-11-10T19:10:41Z

### L-005 - Make the test a check's proof selects assert every case the check names
- signal: `weak_test` · recurrence: 1 feature(s) · scope: `tests` · harmful: 0
- features: 01-foundation
- evidence: C12, C42, C48, C56, C57, C64 (tests)
- last seen: 2026-11-10T19:10:41Z

### L-006 - Test that the layout injects an inline script, not only the script string in isolation
- signal: `weak_test` · recurrence: 1 feature(s) · scope: `tests` · harmful: 0
- features: 01-foundation
- evidence: C15 (tests)
- last seen: 2026-11-10T19:10:41Z

### L-007 - Assert each workspace task appears in a turbo run's output, not only its exit code
- signal: `weak_test` · recurrence: 1 feature(s) · scope: `proofs` · harmful: 0
- features: 01-foundation
- evidence: C4, C5 (proofs)
- last seen: 2026-11-10T19:10:41Z

### L-008 - Test the wiring that triggers a script, such as a package.json lifecycle hook, not only the script
- signal: `weak_test` · recurrence: 1 feature(s) · scope: `proofs` · harmful: 0
- features: 01-foundation
- evidence: C71 (proofs)
- last seen: 2026-11-10T19:10:41Z

## Quarantined (failed when applied - ignore)

A confirmed lesson that recurred alongside failure. Kept for the maintainer to review.

_none_
