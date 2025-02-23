import Timestamp from "../Timestamp";

const Message = (props) => {
    return <>
        {props.message.from == 'system' && <div className="chat chat-start">
            <div className="chat-bubble max-w-[80%] clear-both rounded-lg p-4 bg-gray-200 text-black">
                {props.message.text}
            </div>
            <div className="chat-footer mb-4 ">
                <Timestamp date={props.message.createdAt} />
            </div>

        </div>}
        {props.message.from == 'user' && <div className="chat chat-end">
            <div className="chat-header">
                Obi-Wan Kenobi
            </div>
            <div className="chat-bubble max-w-[80%] clear-both rounded-lg p-4 bg-blue-500 text-white">
                {props.message.text}

            </div>
            <div className="chat-footer mb-4 ">
                <Timestamp date={props.message.createdAt} />
            </div>

        </div>
        }
    </>
}

export default Message;