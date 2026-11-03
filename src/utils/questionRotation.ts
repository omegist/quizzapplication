/**
 * questionRotation.ts
 *
 * Picks a fresh, non-repeating set of questions for each quiz attempt.
 *
 * Strategy:
 *  - We keep a "used" pool in localStorage per quiz ID.
 *  - When starting a quiz we pick `count` questions from the "unseen" pool.
 *  - If fewer than `count` unseen questions remain we reset the pool first
 *    (so users always get a full set) then pick from the fresh pool.
 *  - Within the picked set, questions are shuffled for extra variety.
 */

import type { Question } from '@/types';

const STORAGE_PREFIX = 'quiz_used_ids_';

function storageKey(quizId: string): string {
  return `${STORAGE_PREFIX}${quizId}`;
}

function getUsedIds(quizId: string): string[] {
  try {
    const raw = localStorage.getItem(storageKey(quizId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setUsedIds(quizId: string, ids: string[]): void {
  try {
    localStorage.setItem(storageKey(quizId), JSON.stringify(ids));
  } catch {
    // localStorage full or unavailable – silently ignore
  }
}

/** Fisher-Yates shuffle (returns a new array) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Returns `count` questions for the given quiz, ensuring no question repeats
 * until the whole pool has been exhausted.
 *
 * @param quizId   - Unique quiz identifier (used as localStorage key)
 * @param allQuestions - Full question bank for this quiz (30 questions)
 * @param count    - How many to pick for this attempt (e.g. 10)
 */
export function pickQuestions(
  quizId: string,
  allQuestions: Question[],
  count: number
): Question[] {
  if (allQuestions.length === 0) return [];

  // Clamp count so we never ask for more than we have
  const safeCount = Math.min(count, allQuestions.length);

  let usedIds = getUsedIds(quizId);

  // Determine unseen questions
  let unseen = allQuestions.filter((q) => !usedIds.includes(q.id));

  // If not enough unseen, reset and start fresh
  if (unseen.length < safeCount) {
    usedIds = [];
    unseen = [...allQuestions];
  }

  // Shuffle unseen and pick the first `safeCount`
  const shuffled = shuffle(unseen);
  const picked = shuffled.slice(0, safeCount);

  // Persist the newly used IDs
  const newUsedIds = [...usedIds, ...picked.map((q) => q.id)];
  setUsedIds(quizId, newUsedIds);

  return picked;
}

/**
 * Clears the rotation history for a specific quiz (useful for testing).
 */
export function resetRotation(quizId: string): void {
  try {
    localStorage.removeItem(storageKey(quizId));
  } catch {
    // ignore
  }
}
