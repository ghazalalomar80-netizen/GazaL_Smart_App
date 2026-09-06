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

// ==========================================
// Universal Robot Memory Storage Helpers
// ==========================================

export const ROBOT_MEMORY_STORAGE_KEY = 'gse_robot_memories_v1';

export function getRobotMemories(): import('../types').RobotMemoryItem[] {
  try {
    const raw = localStorage.getItem(ROBOT_MEMORY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load robot memories', e);
    return [];
  }
}

export function saveRobotMemory(
  content: string,
  category: import('../types').RobotMemoryItem['category'] = 'general',
  isPinned: boolean = false
): import('../types').RobotMemoryItem[] {
  try {
    const current = getRobotMemories();
    const trimmed = content.trim();
    if (!trimmed) return current;

    // Check if duplicate exists (case insensitive)
    const exists = current.some(
      (m) => m.content.trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return current;

    const newItem: import('../types').RobotMemoryItem = {
      id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      category,
      content: trimmed,
      createdAt: new Date().toLocaleDateString('ar-SA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      isPinned,
    };

    const updated = [newItem, ...current];
    localStorage.setItem(ROBOT_MEMORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save robot memory', e);
    return getRobotMemories();
  }
}

export function deleteRobotMemory(id: string): import('../types').RobotMemoryItem[] {
  try {
    const current = getRobotMemories();
    const updated = current.filter((m) => m.id !== id);
    localStorage.setItem(ROBOT_MEMORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete robot memory', e);
    return getRobotMemories();
  }
}

export function togglePinRobotMemory(id: string): import('../types').RobotMemoryItem[] {
  try {
    const current = getRobotMemories();
    const updated = current.map((m) =>
      m.id === id ? { ...m, isPinned: !m.isPinned } : m
    );
    localStorage.setItem(ROBOT_MEMORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to pin robot memory', e);
    return getRobotMemories();
  }
}

export function updateRobotMemory(
  id: string,
  newContent: string,
  newCategory?: import('../types').RobotMemoryItem['category']
): import('../types').RobotMemoryItem[] {
  try {
    const current = getRobotMemories();
    const trimmed = newContent.trim();
    if (!trimmed) return current;

    const updated = current.map((m) =>
      m.id === id
        ? {
            ...m,
            content: trimmed,
            ...(newCategory ? { category: newCategory } : {}),
          }
        : m
    );
    localStorage.setItem(ROBOT_MEMORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to update robot memory', e);
    return getRobotMemories();
  }
}

export function clearRobotMemories(): import('../types').RobotMemoryItem[] {
  try {
    localStorage.removeItem(ROBOT_MEMORY_STORAGE_KEY);
    return [];
  } catch (e) {
    console.error('Failed to clear robot memories', e);
    return [];
  }
}

/**
 * Intelligent helper to auto-detect when a user is telling the robot to remember or store a fact.
 */
export function extractMemoryIntent(
  text: string
): { content: string; category: import('../types').RobotMemoryItem['category'] } | null {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();

  // Explicit memory command patterns
  const rememberPatterns = [
    /^(?:تذكر\s*(?:أن|ان|دائماً|دايما)?|احفظ\s*(?:عندك|في\s*ذاكرتك|هذا|هذه\s*المعلومة)?(?:\s*(?:أن|ان))?)\s*[:،,-]?\s*(.+)$/i,
    /^(?:خليك\s*(?:متذكر|فاكر)(?:\s*(?:أن|ان))?)\s*[:،,-]?\s*(.+)$/i,
    /^(?:remember\s*(?:that|this)?|keep\s*in\s*mind\s*(?:that)?|save\s*(?:to\s*memory)?\s*[:,-]?)\s*(.+)$/i,
  ];

  for (const pattern of rememberPatterns) {
    const match = trimmed.match(pattern);
    if (match && match[1] && match[1].trim().length >= 3) {
      const extractedContent = match[1].trim();
      let category: import('../types').RobotMemoryItem['category'] = 'general';

      // Categorize based on keywords
      if (/اسم|أنا|عمري|أعيش|اسمي|name|my name/i.test(extractedContent)) {
        category = 'profile';
      } else if (/دراسة|مدرسة|جامعة|كلية|طالب|واجب|تخصص|صف|سنة|math|school|study|college|homework/i.test(extractedContent)) {
        category = 'academic';
      } else if (/مشروع|شركة|فكرة|ستارتب|عمل|متجر|business|project|startup/i.test(extractedContent)) {
        category = 'project';
      } else if (/أفضل|أحب|أكره|اختصار|مباشر|نقاط|طريقة|prefer|like|style/i.test(extractedContent)) {
        category = 'preference';
      }

      return {
        content: extractedContent,
        category,
      };
    }
  }

  // Self-introduction patterns: "أنا اسمي أحمد" or "اسمي فلان" or "أنا طالب في الصف..."
  const profilePatterns = [
    /^(?:أنا\s*اسمي|اسمي\s*هو|اسمي)\s+([^\n.،]+)$/i,
    /^(?:أنا\s*طالب\s*في|تخصصي\s*هو|أدرس\s*في)\s+([^\n.،]+)$/i,
    /^(?:my\s*name\s*is|i\s*am\s*a\s*student\s*at)\s+([^\n.,]+)$/i,
  ];

  for (const pattern of profilePatterns) {
    const match = trimmed.match(pattern);
    if (match && match[1] && match[1].trim().length >= 2 && trimmed.length < 80) {
      return {
        content: trimmed,
        category: trimmed.includes('طالب') || trimmed.includes('student') || trimmed.includes('تخصص') ? 'academic' : 'profile',
      };
    }
  }

  return null;
}

