import type { Tutorial } from "./types";

export const ENROLLABLE_TUTORIAL_NAME = "Master Web Development";

export function isTutorialEnrollable(tutorial: Tutorial): boolean {
  if (tutorial.coming_soon === true) return false;
  if (tutorial.coming_soon === false) return true;
  return tutorial.name === ENROLLABLE_TUTORIAL_NAME;
}

export function applyTutorialEnrollmentStatus(tutorial: Tutorial): Tutorial {
  if (typeof tutorial.coming_soon === "boolean") {
    return tutorial;
  }
  const comingSoon = tutorial.name !== ENROLLABLE_TUTORIAL_NAME;
  return { ...tutorial, coming_soon: comingSoon };
}
