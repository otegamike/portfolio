import { useEffect } from "react";
import Projects from "../../../components/Projects/Projects"
import SectionLabel from "../../../components/SectionLabel/SectionLabel";

// hooks
import { useProjectContext } from "../../../hooks/useProjectContext";


function MyProjects({Admin = true}: {Admin?: boolean}) {
  const {projects, loadProjects, loading} = useProjectContext();

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
    {loading ? (
      <div className="loading">
        <SectionLabel infinite={true}>Loading Projects....</SectionLabel>
      </div>
    ) : (
      <Projects projects={projects} Admin={Admin} />
    )}
    </>
  )
}

export default MyProjects