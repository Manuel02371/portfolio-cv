import type { PortfolioData } from "./types";

export const portfolioData: PortfolioData = {
  profile: {
    full_name: "MANUEL JHONNATHAN ABANTO FLORES",
    headline: "Analista de Datos / Ingeniero de Datos",
    summary:
      "Ingeniero de Sistemas con experiencia en analisis, gestion de datos y creacion de soluciones ETL robustas usando SSIS y Python. Experiencia en Azure, Azure Data Factory, SQL Cloud y exploracion de Databricks para automatizacion y optimizacion de procesos en entornos cloud.",
    location: "Lima, Peru",
    email: "correo@ejemplo.com",
    phone: null,
    linkedin_url: "https://www.linkedin.com/in/tu-perfil",
    github_url: "https://github.com/tu-usuario",
    portfolio_url: "",
  },
  experiences: [
    {
      company: "Teamsoft, contratado para Pacifico",
      role: "Desarrollador de BBDD / Ingeniero de Datos",
      start_date: "2024-04-01",
      end_date: null,
      is_current: true,
      description:
        "Administracion, optimizacion e integracion de soluciones de datos en nube y entornos hibridos.",
      achievements: [
        "Administracion y optimizacion de soluciones en la nube usando Azure Data Factory y SQL Cloud.",
        "Apoyo en migracion y sincronizacion de bases de datos tradicionales hacia plataformas cloud.",
        "Integracion de bases de datos On-Premise con sistemas en la nube.",
        "Proyecto ETL para integrar y migrar archivos de seguros de desgravamen masivo desde BCP, Banco de la Nacion, Falabella y Maquisistemas hacia Salesforce.",
        "Trabajo con integracion mediante SSIS y preparacion para implementacion en Azure Data Factory.",
      ],
      technologies: ["Azure Data Factory", "SQL Cloud", "SSIS", "Salesforce", "ETL"],
      display_order: 1,
    },
    {
      company: "Cataliz",
      role: "Analista de Datos / Ingeniero de Datos Jr.",
      start_date: "2020-01-01",
      end_date: "2024-03-31",
      is_current: false,
      description:
        "Diseno, mantenimiento y optimizacion de pipelines, bases de datos y modelos analiticos.",
      achievements: [
        "Diseno, implementacion y mantenimiento de pipelines ETL usando SSIS y Python.",
        "Administracion y optimizacion de bases de datos SQL Server y MySQL.",
        "Modelado de datos, indexacion y consultas complejas.",
        "Desarrollo de soluciones para datalakes y data warehouses.",
        "Automatizacion de procesos de recoleccion, transformacion y carga de datos.",
        "Mejora en la asignacion de cargas de datos, generando un incremento del 30% en ventas de tarjetas de credito.",
        "Implementacion de vistas periodicas mensuales, reduciendo el tiempo de procesamiento en 50% para reportes recurrentes.",
      ],
      technologies: ["SSIS", "Python", "SQL Server", "MySQL", "Datalakes"],
      display_order: 2,
    },
    {
      company: "Alto Contacto",
      role: "Analista de Datos",
      start_date: "2019-01-01",
      end_date: "2019-11-30",
      is_current: false,
      description:
        "Automatizacion y mantenimiento de procesos de datos para operaciones analiticas.",
      achievements: [
        "Diseno, implementacion y mantenimiento de procesos ETL con SSIS y Python.",
        "Administracion y optimizacion de bases SQL Server y MySQL.",
        "Automatizacion de procesos de datos.",
      ],
      technologies: ["SSIS", "Python", "SQL Server", "MySQL"],
      display_order: 3,
    },
    {
      company: "Atento",
      role: "Analista de Datos",
      start_date: "2017-06-01",
      end_date: "2018-07-31",
      is_current: false,
      description:
        "Analisis de datos, reporteria estadistica y metricas de rendimiento para Movistar Negocios.",
      achievements: [
        "Analisis de datos y generacion de reportes estadisticos para Movistar Negocios.",
        "Desarrollo de rankings y metricas de rendimiento usando herramientas BI.",
      ],
      technologies: ["BI", "Excel avanzado", "Reporteria", "Analisis estadistico"],
      display_order: 4,
    },
  ],
  projects: [
    {
      name: "ETL de seguros de desgravamen masivo",
      description:
        "Integracion y migracion de archivos bancarios hacia Salesforce para procesos de seguros.",
      problem:
        "Los archivos llegaban desde bancos como BCP, Banco de la Nacion, Falabella y Maquisistemas con estructuras que requerian control y trazabilidad.",
      solution:
        "Se preparo un flujo ETL con SSIS y una ruta de implementacion hacia Azure Data Factory.",
      technologies: ["SSIS", "Azure Data Factory", "Salesforce", "SQL"],
      repository_url: "",
      demo_url: "",
      display_order: 1,
      is_featured: true,
    },
    {
      name: "Optimizacion de cargas de datos comerciales",
      description:
        "Mejora de asignacion de cargas de datos para procesos comerciales.",
      problem:
        "La distribucion de datos limitaba la eficiencia de campanas y seguimiento comercial.",
      solution:
        "Se ajustaron procesos de carga y asignacion, generando un incremento del 30% en ventas de tarjetas de credito.",
      technologies: ["SQL Server", "Python", "ETL"],
      repository_url: "",
      demo_url: "",
      display_order: 2,
      is_featured: true,
    },
    {
      name: "Vistas mensuales para reportes recurrentes",
      description:
        "Estandarizacion de vistas periodicas para acelerar reportes mensuales.",
      problem:
        "Los reportes recurrentes consumian demasiado tiempo de procesamiento.",
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
    { name: "Excel avanzado", category: "BI y analisis", level: 5, display_order: 5 },
    { name: "Power BI", category: "BI y analisis", level: 4, display_order: 6 },
    { name: "SSIS", category: "ETL y automatizacion", level: 5, display_order: 7 },
    { name: "Scripts Python", category: "ETL y automatizacion", level: 4, display_order: 8 },
    { name: "Modelado de datos", category: "Gestion de datos", level: 4, display_order: 9 },
    { name: "Optimizacion de bases de datos", category: "Gestion de datos", level: 4, display_order: 10 },
    { name: "Data warehouses", category: "Gestion de datos", level: 4, display_order: 11 },
    { name: "Datalakes", category: "Gestion de datos", level: 3, display_order: 12 },
    { name: "Azure", category: "Cloud", level: 4, display_order: 13 },
    { name: "Azure Data Factory", category: "Cloud", level: 4, display_order: 14 },
    { name: "SQL Cloud", category: "Cloud", level: 4, display_order: 15 },
    { name: "GCP", category: "Cloud", level: 2, display_order: 16 },
    { name: "BigQuery", category: "Cloud", level: 2, display_order: 17 },
    { name: "Databricks (exploracion)", category: "Cloud", level: 2, display_order: 18 },
  ],
  certifications: [],
  education: [
    {
      institution: "Universidad Nacional del Callao",
      degree: "Bachiller en Ingenieria de Sistemas",
      start_date: "2013-01-01",
      end_date: "2018-12-31",
      description: "Tercio superior.",
      display_order: 1,
    },
  ],
  contacts: [
    {
      label: "Email",
      value: "correo@ejemplo.com",
      url: "mailto:correo@ejemplo.com",
      display_order: 1,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/tu-perfil",
      url: "https://www.linkedin.com/in/tu-perfil",
      display_order: 2,
    },
    {
      label: "GitHub",
      value: "github.com/tu-usuario",
      url: "https://github.com/tu-usuario",
      display_order: 3,
    },
  ],
};
