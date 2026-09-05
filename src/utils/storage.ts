import { ProjectPlan, AcademicResearchPlan } from '../types';

const STORAGE_KEY = 'gse_ai_saved_plans';
const RESEARCH_STORAGE_KEY = 'gse_ai_saved_research_plans';

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

// ==========================================
// Academic Research Storage Helpers
// ==========================================

export function getSavedResearchPlans(): AcademicResearchPlan[] {
  try {
    const raw = localStorage.getItem(RESEARCH_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved research plans', e);
    return [];
  }
}

export function saveResearchPlanToStorage(research: AcademicResearchPlan): AcademicResearchPlan[] {
  try {
    const current = getSavedResearchPlans();
    const existingIndex = current.findIndex((r) => r.id === research.id);
    let updated: AcademicResearchPlan[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = research;
    } else {
      updated = [research, ...current];
    }
    localStorage.setItem(RESEARCH_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save research plan', e);
    return getSavedResearchPlans();
  }
}

export function deleteResearchPlanFromStorage(researchId: string): AcademicResearchPlan[] {
  try {
    const current = getSavedResearchPlans();
    const updated = current.filter((r) => r.id !== researchId);
    localStorage.setItem(RESEARCH_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete research plan', e);
    return getSavedResearchPlans();
  }
}

