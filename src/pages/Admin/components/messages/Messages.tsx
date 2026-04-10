import { getMessages } from "../../../../services/messageServices"
import { useState, useEffect } from "react"
import { type IMessage } from "../../../../types/messageInterface";
import SectionLabel from "../../../../components/SectionLabel/SectionLabel";
import { Trash, Loader2 } from 'lucide-react';
import "./messages.css"

// services
import { deleteMessage } from "../../../../services/messageServices";

function Messages() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(true);

    const silentLoad = async () => {
        try {
            const messages = await getMessages();
            setMessages(messages);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchMessages = async () => {
        setLoading(true);
        await silentLoad();
        setLoading(false);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    if (loading) return (
        <>
            <SectionLabel> Messages </SectionLabel>
            <section className="admin-section">
                <SectionLabel infinite={true} >Loading...</SectionLabel>
            </section>
        </>
    )

    else if (messages.length > 0) return (
        <>
            <SectionLabel> Messages </SectionLabel>
            <section className="admin-section">
                <MessagesList silentLoad={silentLoad} messages={messages} />
            </section>
        </>
    )
    else return (
        <>
            <SectionLabel> No messages yet </SectionLabel>
            <section className="admin-section">

            </section>
        </>

    )
}

export default Messages

const MessageCard = ({ message, silentLoad }: { message: IMessage, silentLoad: () => Promise<void> }) => {
    const date = new Date(message.createdAt);
    const formattedDate = date.toLocaleDateString();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteMessage(message._id);
            await silentLoad();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="message-card">
            <button className="delete-btn" onClick={handleDelete}>
                {loading ? <Loader2 size={20} className="spinner" /> : <Trash size={20} />}
            </button>
            <div className="message-card-header">
                <span className="message-card-name">{message.name}</span>
                <p className="message-card-email">{message.email}</p>
            </div>
            <p className="message-card-message">{message.message}</p>
            <div className="message-card-footer">
                <span className="message-card-date">{formattedDate}</span>
            </div>
        </div>
    )
}

const MessagesList = ({ messages, silentLoad }: { messages: IMessage[], silentLoad: () => Promise<void> }) => {
    return (
        <div className="messages-list">
            {messages.map((message) => (
                <MessageCard key={message._id} message={message} silentLoad={silentLoad} />
            ))}
        </div>
    )
}