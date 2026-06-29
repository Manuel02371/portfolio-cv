import type { CvData } from "@/types/domain";

export const initialCvData: CvData = {
  profile: {
    id: "profile-main",
    fullName: "Manuel Vargas",
    headline: "Data Analyst / Data Engineer / Business Intelligence",
    summary:
      "Profesional orientado a convertir datos operativos en informacion confiable para la toma de decisiones. Trabajo con SQL Server, Python, Power BI, procesos ETL, Azure, scraping, automatizacion y validacion de informacion en entornos de negocio.",
    location: "Lima, Peru",
    email: "manuel@example.com",
    phone: "+51 999 999 999",
    linkedinUrl: "https://www.linkedin.com/",
    githubUrl: "https://github.com/",
    portfolioUrl: "https://example.com",
    isPublished: true,
  },
  experiences: [
    {
      id: "experience-bi-data",
      company: "Entornos de seguros y servicios",
      role: "Data Analyst / BI Specialist",
      startDate: "2022-01-01",
      endDate: "",
      isCurrent: true,
      description:
        "Analisis, validacion y transformacion de informacion para procesos comerciales, operativos y de reporting.",
      achievements: [
        "Construccion de reportes comerciales con Excel y Power BI.",
        "Validacion de informacion para reducir errores antes de la carga.",
        "Automatizacion de tareas repetitivas con Python y SQL.",
      ],
      technologies: ["SQL Server", "Power BI", "Excel", "Python", "ETL"],
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "experience-data-engineering",
      company: "Proyectos de migracion y datos",
      role: "Data Engineer",
      startDate: "2020-01-01",
      endDate: "2021-12-31",
      isCurrent: false,
      description:
        "Implementacion de procesos de migracion, generacion de scripts SQL y carga controlada de datos.",
      achievements: [
        "Generacion de scripts INSERT para pruebas y cargas masivas.",
        "Migracion de datos on-premise hacia ambientes cloud.",
        "Control de calidad de datos antes y despues de procesos ETL.",
      ],
      technologies: ["SQL Server", "Azure", "Python", "PostgreSQL"],
      displayOrder: 2,
      isPublished: true,
    },
  ],
  projects: [
    {
      id: "project-migration-cloud",
      name: "Migracion de datos on-premise a nube",
      description:
        "Planificacion y ejecucion de migracion usando SQL Server, controles de calidad y validacion posterior.",
      problem:
        "Los datos estaban distribuidos en entornos legacy con validaciones manuales y riesgo de inconsistencias.",
      solution:
        "Se diseno un flujo reproducible con consultas de control, scripts de carga y conciliacion final.",
      technologies: ["SQL Server", "Azure", "ETL", "Data Quality"],
      repositoryUrl: "",
      demoUrl: "",
      displayOrder: 1,
      isFeatured: true,
      isPublished: true,
    },
    {
      id: "project-sql-inserts",
      name: "Generador de scripts SQL para carga de datos",
      description:
        "Herramienta para construir scripts INSERT reutilizables en escenarios de pruebas, carga y migracion.",
      problem:
        "Preparar datos de prueba manualmente tomaba demasiado tiempo y era propenso a errores.",
      solution:
        "Automatizacion para transformar estructuras tabulares en scripts SQL consistentes.",
      technologies: ["SQL Server", "Python", "Automation"],
      repositoryUrl: "",
      demoUrl: "",
      displayOrder: 2,
      isFeatured: true,
      isPublished: true,
    },
    {
      id: "project-python-automation",
      name: "Automatizacion de procesos con Python",
      description:
        "Scripts para reducir tareas repetitivas de limpieza, transformacion y validacion de datos.",
      problem:
        "Procesos diarios dependian de pasos manuales en archivos y consultas.",
      solution:
        "Automatizaciones con Python para estandarizar entradas, controles y salidas.",
      technologies: ["Python", "Pandas", "Excel", "SQL"],
      repositoryUrl: "",
      demoUrl: "",
      displayOrder: 3,
      isFeatured: true,
      isPublished: true,
    },
    {
      id: "project-scraping-alerts",
      name: "Scraping web con historico y alertas",
      description:
        "Extraccion periodica de datos web, almacenamiento historico y alertas basadas en cambios relevantes.",
      problem:
        "La informacion externa se revisaba manualmente y sin trazabilidad historica.",
      solution:
        "Scraper con almacenamiento estructurado y reglas de alerta para detectar variaciones.",
      technologies: ["Python", "Scraping", "PostgreSQL", "Alerts"],
      repositoryUrl: "",
      demoUrl: "",
      displayOrder: 4,
      isFeatured: true,
      isPublished: true,
    },
    {
      id: "project-powerbi-commercial",
      name: "Reportes comerciales con Excel y Power BI",
      description:
        "Modelos de analisis comercial con indicadores claros para seguimiento de ventas y gestion.",
      problem:
        "Los indicadores estaban dispersos en archivos y sin una lectura ejecutiva unica.",
      solution:
        "Modelo de datos y dashboards con metricas de seguimiento, filtros y vistas ejecutivas.",
      technologies: ["Power BI", "Excel", "DAX", "SQL Server"],
      repositoryUrl: "",
      demoUrl: "",
      displayOrder: 5,
      isFeatured: true,
      isPublished: true,
    },
    {
      id: "project-insurance-etl",
      name: "Procesos ETL y validacion en seguros",
      description:
        "Flujos de extraccion, transformacion y validacion para informacion operativa en seguros.",
      problem:
        "La informacion de origen requeria controles antes de alimentar reportes y procesos internos.",
      solution:
        "ETL con reglas de negocio, conciliaciones y salida preparada para analisis.",
      technologies: ["ETL", "SQL Server", "Python", "Data Validation"],
      repositoryUrl: "",
      demoUrl: "",
      displayOrder: 6,
      isFeatured: false,
      isPublished: true,
    },
  ],
  skills: [
    {
      id: "skill-sql-server",
      name: "SQL Server",
      category: "Bases de datos",
      level: 5,
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "skill-python",
      name: "Python",
      category: "Automatizacion",
      level: 4,
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: "skill-power-bi",
      name: "Power BI",
      category: "Business Intelligence",
      level: 4,
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: "skill-etl",
      name: "Procesos ETL",
      category: "Data Engineering",
      level: 4,
      displayOrder: 4,
      isPublished: true,
    },
    {
      id: "skill-azure",
      name: "Azure",
      category: "Cloud",
      level: 3,
      displayOrder: 5,
      isPublished: true,
    },
    {
      id: "skill-scraping",
      name: "Web scraping",
      category: "Automatizacion",
      level: 4,
      displayOrder: 6,
      isPublished: true,
    },
  ],
  certifications: [
    {
      id: "cert-power-bi",
      name: "Power BI y modelado de datos",
      institution: "Formacion profesional",
      issueDate: "2024-01-01",
      credentialUrl: "",
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "cert-sql",
      name: "SQL Server para analisis de datos",
      institution: "Formacion profesional",
      issueDate: "2023-01-01",
      credentialUrl: "",
      displayOrder: 2,
      isPublished: true,
    },
  ],
  education: [
    {
      id: "edu-data",
      institution: "Formacion tecnica y profesional",
      degree: "Analisis de datos, bases de datos y BI",
      startDate: "2019-01-01",
      endDate: "2024-01-01",
      description:
        "Especializacion practica en bases de datos, reporting, automatizacion y procesos de datos.",
      displayOrder: 1,
      isPublished: true,
    },
  ],
  contacts: [
    {
      id: "contact-email",
      label: "Correo",
      value: "manuel@example.com",
      url: "mailto:manuel@example.com",
      displayOrder: 1,
      isPublic: true,
    },
    {
      id: "contact-linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/manuel",
      url: "https://www.linkedin.com/",
      displayOrder: 2,
      isPublic: true,
    },
    {
      id: "contact-github",
      label: "GitHub",
      value: "github.com/manuel",
      url: "https://github.com/",
      displayOrder: 3,
      isPublic: true,
    },
  ],
};
