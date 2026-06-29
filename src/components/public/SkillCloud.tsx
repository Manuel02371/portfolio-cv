import type { Skill } from "@/types/domain";

type SkillCloudProps = {
  skills: Skill[];
};

export function SkillCloud({ skills }: SkillCloudProps) {
  if (skills.length === 0) {
    return <p className="text-slate-600 dark:text-slate-300">Agrega habilidades desde el panel administrador.</p>;
  }

  const grouped = skills.reduce<Record<string, Skill[]>>((groups, skill) => {
    const current = groups[skill.category] ?? [];
    return { ...groups, [skill.category]: [...current, skill] };
  }, {});

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(grouped).map(([category, categorySkills]) => (
        <div
          key={category}
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <h3 className="text-base font-semibold text-slate-950 dark:text-white">
            {category}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {categorySkills.map((skill) => (
              <span
                key={skill.id ?? skill.name}
                className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {skill.name}
                <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                  {skill.level}/5
                </span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
