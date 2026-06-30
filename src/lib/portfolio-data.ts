import type { PortfolioData } from "./types";

export const portfolioData: PortfolioData = {
  profile: {
    full_name: "MANUEL JHONNATHAN ABANTO FLORES",
    headline: "Analista de Datos / Ingeniero de Datos",
    summary:
      "Ingeniero de Sistemas con experiencia en análisis, gestión de datos y creación de soluciones ETL robustas usando SSIS y Python. Experiencia en Azure, Azure Data Factory, SQL Cloud y exploración de Databricks para automatización y optimización de procesos en entornos cloud.",
    location: "Lima, Perú",
    email: "manuel.abanto.flores02@gmail.com",
    phone: "+51933703902",
    linkedin_url: "https://www.linkedin.com/in/manuel-abanto-flores",
    github_url: "https://github.com/Manuel02371",
    portfolio_url: "",
  },
  experiences: [
    {
      company: "IDM, contratado para Pacífico",
      role: "Desarrollador de BBDD / Ingeniero de Datos",
      start_date: "2025-04-01",
      end_date: null,
      is_current: true,
      description:
        "Administración, optimización e integración de soluciones de datos en nube y entornos híbridos.",
      achievements: [
        "Administración y optimización de soluciones en la nube usando Azure Data Factory y SQL Cloud.",
        "Apoyo en migración y sincronización de bases de datos tradicionales hacia plataformas cloud.",
        "Integración de bases de datos On-Premise con sistemas en la nube.",
        "Proyecto ETL para integrar y migrar archivos de seguros de desgravamen masivo desde BCP, Banco de la Nación, Falabella y Maquisistemas hacia Salesforce.",
        "Trabajo con integración mediante SSIS y preparación para implementación en Azure Data Factory.",
      ],
      technologies: ["Azure Data Factory", "SQL Cloud", "SSIS", "Salesforce", "ETL"],
      display_order: 1,
    },
    {
      company: "Teamsoft, contratado para Pacífico",
      role: "Desarrollador de BBDD / Ingeniero de Datos",
      start_date: "2024-04-01",
      end_date: "2025-03-31",
      is_current: false,
      description:
        "Administración, optimización e integración de soluciones de datos en nube y entornos híbridos.",
      achievements: [
        "Administración y optimización de soluciones en la nube usando Azure Data Factory y SQL Cloud.",
        "Apoyo en migración y sincronización de bases de datos tradicionales hacia plataformas cloud.",
        "Integración de bases de datos On-Premise con sistemas en la nube.",
        "Proyecto ETL para integrar y migrar archivos de seguros de desgravamen masivo desde BCP, Banco de la Nación, Falabella y Maquisistemas hacia Salesforce.",
        "Trabajo con integración mediante SSIS y preparación para implementación en Azure Data Factory.",
      ],
      technologies: ["Azure Data Factory", "SQL Cloud", "SSIS", "Salesforce", "ETL"],
      display_order: 2,
    },
    {
      company: "Cataliz",
      role: "Analista de Datos / Ingeniero de Datos Jr.",
      start_date: "2020-01-01",
      end_date: "2024-03-31",
      is_current: false,
      description:
        "Diseño, mantenimiento y optimización de pipelines, bases de datos y modelos analíticos.",
      achievements: [
        "Diseño, implementación y mantenimiento de pipelines ETL usando SSIS y Python.",
        "Administración y optimización de bases de datos SQL Server y MySQL.",
        "Modelado de datos, indexación y consultas complejas.",
        "Desarrollo de soluciones para datalakes y data warehouses.",
        "Automatización de procesos de recolección, transformación y carga de datos.",
        "Mejora en la asignación de cargas de datos, generando un incremento del 30% en ventas de tarjetas de crédito.",
        "Implementación de vistas periódicas mensuales, reduciendo el tiempo de procesamiento en 50% para reportes recurrentes.",
      ],
      technologies: ["SSIS", "Python", "SQL Server", "MySQL", "Datalakes"],
      display_order: 3,
    },
    {
      company: "Alto Contacto",
      role: "Analista de Datos",
      start_date: "2019-01-01",
      end_date: "2019-11-30",
      is_current: false,
      description:
        "Automatización y mantenimiento de procesos de datos para operaciones analíticas.",
      achievements: [
        "Diseño, implementación y mantenimiento de procesos ETL con SSIS y Python.",
        "Administración y optimización de bases SQL Server y MySQL.",
        "Automatización de procesos de datos.",
      ],
      technologies: ["SSIS", "Python", "SQL Server", "MySQL"],
      display_order: 4,
    },
    {
      company: "Atento",
      role: "Analista de Datos",
      start_date: "2017-06-01",
      end_date: "2018-07-31",
      is_current: false,
      description:
        "Análisis de datos, reportería estadística y métricas de rendimiento para Movistar Negocios.",
      achievements: [
        "Análisis de datos y generación de reportes estadísticos para Movistar Negocios.",
        "Desarrollo de rankings y métricas de rendimiento usando herramientas BI.",
      ],
      technologies: ["BI", "Excel avanzado", "Reportería", "Análisis estadístico"],
      display_order: 5,
    },
  ],
  projects: [
    {
      name: "ETL de seguros de desgravamen masivo",
      description:
        "Integración y migración de archivos bancarios hacia Salesforce para procesos de seguros.",
      problem:
        "Los archivos llegaban desde bancos como BCP, Banco de la Nación, Falabella y Maquisistemas con estructuras que requerían control y trazabilidad.",
      solution:
        "Se preparó un flujo ETL con SSIS y una ruta de implementación hacia Azure Data Factory.",
      technologies: ["SSIS", "Azure Data Factory", "Salesforce", "SQL"],
      repository_url: "",
      demo_url: "",
      display_order: 1,
      is_featured: true,
    },
    {
      name: "Optimización de cargas de datos comerciales",
      description:
        "Mejora de asignación de cargas de datos para procesos comerciales.",
      problem:
        "La distribución de datos limitaba la eficiencia de campañas y seguimiento comercial.",
      solution:
        "Se ajustaron procesos de carga y asignación, generando un incremento del 30% en ventas de tarjetas de crédito.",
      technologies: ["SQL Server", "Python", "ETL"],
      repository_url: "",
      demo_url: "",
      display_order: 2,
      is_featured: true,
    },
    {
      name: "Vistas mensuales para reportes recurrentes",
      description:
        "Estandarización de vistas periódicas para acelerar reportes mensuales.",
      problem:
        "Los reportes recurrentes consumían demasiado tiempo de procesamiento.",
      solution:
        "Se implementaron vistas mensuales, reduciendo el tiempo de procesamiento en 50%.",
      technologies: ["SQL Server", "Modelado de datos", "BI"],
      repository_url: "",
      demo_url: "",
      display_order: 3,
      is_featured: true,
    },
  ],
  skills: [
    { name: "Python", category: "Lenguajes", level: 4, display_order: 1 },
    { name: "SQL", category: "Lenguajes", level: 5, display_order: 2 },
    { name: "SQL Server", category: "Bases de datos", level: 5, display_order: 3 },
    { name: "MySQL", category: "Bases de datos", level: 4, display_order: 4 },
    { name: "Excel avanzado", category: "BI y análisis", level: 5, display_order: 5 },
    { name: "Power BI", category: "BI y análisis", level: 4, display_order: 6 },
    { name: "SSIS", category: "ETL y automatización", level: 5, display_order: 7 },
    { name: "Scripts Python", category: "ETL y automatización", level: 4, display_order: 8 },
    { name: "Modelado de datos", category: "Gestión de datos", level: 4, display_order: 9 },
    { name: "Optimización de bases de datos", category: "Gestión de datos", level: 4, display_order: 10 },
    { name: "Data warehouses", category: "Gestión de datos", level: 4, display_order: 11 },
    { name: "Datalakes", category: "Gestión de datos", level: 3, display_order: 12 },
    { name: "Azure", category: "Cloud", level: 4, display_order: 13 },
    { name: "Azure Data Factory", category: "Cloud", level: 4, display_order: 14 },
    { name: "SQL Cloud", category: "Cloud", level: 4, display_order: 15 },
    { name: "GCP", category: "Cloud", level: 2, display_order: 16 },
    { name: "BigQuery", category: "Cloud", level: 2, display_order: 17 },
    { name: "Databricks (exploración)", category: "Cloud", level: 2, display_order: 18 },
  ],
  certifications: [],
  education: [
    {
      institution: "Universidad Nacional del Callao",
      degree: "Bachiller en Ingeniería de Sistemas",
      start_date: "2013-01-01",
      end_date: "2018-12-31",
      description: "Tercio superior.",
      display_order: 1,
    },
  ],
  contacts: [
    {
      label: "Email",
      value: "manuel.abanto.flores02@gmail.com",
      url: "mailto:manuel.abanto.flores02@gmail.com",
      display_order: 1,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/manuel-abanto-flores",
      url: "https://www.linkedin.com/in/manuel-abanto-flores",
      display_order: 2,
    },
    {
      label: "GitHub",
      value: "github.com/Manuel02371",
      url: "https://github.com/Manuel02371",
      display_order: 3,
    },
  ],
};
