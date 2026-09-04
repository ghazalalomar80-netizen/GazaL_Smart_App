import { ProjectPlan } from '../types';

const STORAGE_KEY = 'gse_ai_saved_plans';

export function getSavedPlans(): ProjectPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved plans', e);
    return [];
  }
}

export function savePlanToStorage(plan: ProjectPlan): ProjectPlan[] {
  try {
    const current = getSavedPlans();
    // Check if already exists, update it, otherwise prepend
    const existingIndex = current.findIndex((p) => p.id === plan.id);
    let updated: ProjectPlan[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = plan;
    } else {
      updated = [plan, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save plan', e);
    return getSavedPlans();
  }
}

export function deletePlanFromStorage(planId: string): ProjectPlan[] {
  try {
    const current = getSavedPlans();
    const updated = current.filter((p) => p.id !== planId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete plan', e);
    return getSavedPlans();
  }
}
