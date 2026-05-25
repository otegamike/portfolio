import { type IMessageForm, MessageFormSchema } from "../../types/messageInterface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { sendMessage } from "../../services/messageServices";

const emptyMessage = {
    name: "",
    email: "",
    message: "",
}

function ConactForm() {

    const [formSubmited, setFormSubmitted] = useState(false);

    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<IMessageForm>({
        defaultValues: emptyMessage,
        resolver: zodResolver(MessageFormSchema),
    })

    const onSubmit = async (data: IMessageForm) => {
        try {
            await sendMessage(data);
            reset(emptyMessage);
            setFormSubmitted(true);
        } catch (error) {
            console.error(error);
        }
    }

  if (formSubmited) {
    return (
        <div className="contact__form">
            <div className="contact__info-card contact__info-card--success">
                <CircleCheck color="var(--accent)" size={70} />
                <p>Your message was sent successfully! I will get back to you as soon as possible.</p>
                <button
                    onClick={() => setFormSubmitted(false)}
                    className="project-card__link project-card__link--secondary"
                >
                    Send another message
                </button>
            </div>
        </div>
    )
  } else { 
    return (
    <form
        className="contact__form"
        onSubmit={handleSubmit(onSubmit)}
    >
        <div className="contact__field">
            <label htmlFor="contact-name" className="contact__label">
                Name
            </label>
            <input 
                className="contact__input" 
                placeholder="Your name"
                {...register("name")} 
            />
            {errors.name && <span className="field-error">{errors.name.message}</span>}

        </div>

        <div className="contact__field">
            <label htmlFor="contact-email" className="contact__label">
                Email
            </label>
            <input 
                className="contact__input" 
                placeholder="you@example.com"
                {...register("email")} 
            />
            {errors.email && <span className="field-error">{errors.email.message}</span>}

        </div>

        <div className="contact__field">
            <label htmlFor="contact-message" className="contact__label">
                Message
            </label>
            <textarea 
                className="contact__input" 
                placeholder="Tell me about your project..."
                rows={5}
                {...register("message")} 
            />
            {errors.message && <span className="field-error">{errors.message.message}</span>}

        </div>

        <button
            type="submit"
            className="contact__submit"
        >
            {isSubmitting? "Sending..." : "Send Message"}
        </button>
    </form>
  )
 }
}

export default ConactForm
