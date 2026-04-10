import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import JSON5 from 'json5';
import { alertObj } from '../../../utils/alerts/alert';

import { ListInput } from './ListInput';

// services
import { addNewProject, updateProject } from '../../../services/projectServices';

// types & schemas
import { ProjectSchema, type ProjectFormValues } from '../../../types/projectInterface';

// context hooks
import { useProjectContext } from '../../../hooks/useProjectContext';

const emptyFormData: ProjectFormValues = {
  title: '',
  previews: [],
  description: '',
  techStack: [],
  features: [],
  liveUrl: '',
  githubUrl: '',
  color: '',
};

interface ProjectFormProps {
  project?: ProjectFormValues;
  editMode?: boolean;
  exitEditMode?: () => void;
  id?: string;
}

function ProjectForm({project = emptyFormData, editMode = false, id, exitEditMode}: ProjectFormProps) {

  const { silentReload } = useProjectContext();

  const [viewMode, setViewMode] = useState<'manual' | 'bulk'>('manual');
  const [bulkText, setBulkText] = useState('');
  const [importError, setImportError] = useState('');

  const { register, handleSubmit, control, reset, trigger, formState: { errors, isSubmitting } } = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: project,
  });

  // JSON Import Logic
    const handleBulkImport = async () => {
      setImportError('');
      try {
        const rawObject = JSON5.parse(bulkText);
        const result = ProjectSchema.safeParse(rawObject);
  
        if (result.success) {
          reset(result.data);
          setViewMode('manual');
        } else {
          // MERGE LOGIC: Fill valid fields, leave invalid ones empty
          const partialData = { ...emptyFormData };
          const fieldErrors = result.error.flatten().fieldErrors;
  
          (Object.keys(ProjectSchema.shape) as Array<keyof ProjectFormValues>).forEach((key) => {
            if (!fieldErrors[key] && rawObject[key] !== undefined) {
              partialData[key] = rawObject[key];
            }
          });
  
          reset(partialData);
          setImportError(`Imported with ${Object.keys(fieldErrors).length} validation errors. Fix them manually below.`);
          setViewMode('manual');
          setTimeout(() => trigger(), 100); // Trigger red error highlights
        }
      } catch (err) {
        setImportError("Syntax Error: Invalid JavaScript/JSON object structure.");
      }
    };

    const onProjectSubmit = async (data: ProjectFormValues) => {
        try {
          if (editMode) {
            if (!id) {
              alertObj("Project ID is required for update", "error");
              throw new Error("Project ID is required for update");
            }
            await updateProject(id, data);
            exitEditMode?.();
          } else {
            await addNewProject(data);
          }
          await silentReload();
          reset(emptyFormData);
        } catch (err) {
          console.error(err);
        }
      };

  return (
    <div className="form-grid-container">
        
        <div className="view-toggle">
            <button className={viewMode === 'manual' ? 'active' : ''} onClick={() => setViewMode('manual')}>form</button>
            <button className={viewMode === 'bulk' ? 'active' : ''} onClick={() => setViewMode('bulk')}>json</button>
        </div>
        

        {viewMode === 'bulk' ? (
            <div className="input-group ">
            <textarea 
                className="bulk-textarea"
                placeholder="Paste JS Object here... e.g. { title: 'Project', techStack: ['React'] }"
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                rows={12}
            />
            {importError && <p className="error-message">{importError}</p>}
            <button className="admin-btn" onClick={handleBulkImport}>VALIDATE & INJECT</button>
            </div>
        ) : (
            <form onSubmit={handleSubmit(onProjectSubmit)}>
            <div className="form-grid">
                <div className="input-group">
                <label>Project Title</label>
                <input {...register("title")} />
                {errors.title && <span className="field-error">{errors.title.message}</span>}
                </div>

                <div className="input-group">
                <label>Theme Color (Hex/Gradient)</label>
                <input {...register("color")} />
                {errors.color && <span className="field-error">{errors.color.message}</span>}
                </div>

                <div className="input-group">
                <label>Live URL</label>
                <input {...register("liveUrl")} />
                {errors.liveUrl && <span className="field-error">{errors.liveUrl.message}</span>}
                </div>

                <div className="input-group">
                <label>GitHub URL</label>
                <input {...register("githubUrl")} />
                {errors.githubUrl && <span className="field-error">{errors.githubUrl.message}</span>}
                </div>

                <div className="input-group full-width">
                <label>Description</label>
                <textarea {...register("description")} rows={4} />
                {errors.description && <span className="field-error">{errors.description.message}</span>}
                </div>

                <Controller
                name="techStack"
                control={control}
                render={({ field }) => (
                    <ListInput label="Tech Stack" id="techStack" formValue={field.value} handlePillsChange={(_, val) => field.onChange(val)} />
                )}
                />

                <Controller
                name="features"
                control={control}
                render={({ field }) => (
                    <ListInput label="Features" id="features" formValue={field.value} handlePillsChange={(_, val) => field.onChange(val)} />
                )}
                />

                <Controller
                name="previews"
                control={control}
                render={({ field }) => (
                    <ListInput 
                    label="Preview Images" 
                    id="previews" 
                    type="image-preview" 
                    formValue={field.value} 
                    handlePillsChange={(_, val) => field.onChange(val)} 
                    />
                )}
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="admin-btn" disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : editMode ? 'UPDATE_PROJECT' : 'SUBMIT_PROJECT'}
                </button>
            </div>
            </form>
        )}

    </div>
  )
}

export default ProjectForm