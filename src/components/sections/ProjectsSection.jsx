'use client';

// --- CORRECCIÓN: Se quitan las llaves para imports por defecto ---
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/cards/ProjectCard";
import { PROJECTS } from "@/lib/constants";

function ProjectsSection() {
    return (
        <Section
            id="proyectos"
            title="Proyectos Recientes que Generan Clientes"
            subtitle="Resultados reales para negocios de Honduras. Cada proyecto es un motor de ventas."
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((p) => <ProjectCard key={p.title} {...p} />)}
            </div>
        </Section>
    );
}

export default ProjectsSection;