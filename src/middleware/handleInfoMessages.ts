import * as Express from "express";

/**
 * Handles sesssion messages, being sure all messages will only be seen once. 
 */
function handleInfoMessages (req : Express.Request, res : Express.Response, next : Function) {

    if (req.session.messages) {
        if (!req.session.seenMessages) req.session.seenMessages = [];
        req.session.messages.forEach((message, index) => {
            if (req.session.seenMessages.includes(message)) {
                req.session.messages.splice(index, 1);
            } else {
                req.session.seenMessages.push(message);
            }
        });
    }

    next();

}

export {handleInfoMessages};