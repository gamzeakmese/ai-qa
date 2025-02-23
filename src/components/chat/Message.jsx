import Markdown from "react-markdown";
import Timestamp from "../Timestamp";

const Message = (props) => {
    return <>
        {props.systemLoading && <div className="chat chat-start">
            <div className="chat-bubble mb-4">
                <span className="loading loading-dots loading-xs"></span>
            </div>
        </div>}
        {props.message?.from == 'system' && <div className="chat chat-start">
            <div className="chat-bubble">
                <div className="markdown">
                    <Markdown>
                        {props.message.text}
                    </Markdown>
                </div>
            </div>
            <div className="chat-footer mb-4">
                <Timestamp date={props.message.createdAt} />
            </div>

        </div>}
        {props.message?.from == 'user' && <div className="chat chat-end">
            <div className="chat-header">
                Obi-Wan Kenobi
            </div>
            <div className="chat-bubble">
                <p>
                    {props.message.text}
                </p>

            </div>
            <div className="chat-footer mb-4 ">
                <Timestamp date={props.message.createdAt} />
            </div>

        </div>
        }
    </>
}

export default Message;