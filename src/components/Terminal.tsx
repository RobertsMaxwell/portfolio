import "../styles/Terminal.css"

import React from 'react'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { initializeApp } from "firebase/app"
import { getDatabase, ref, set, push } from "firebase/database"

function Terminal () {
    const [previous, setPrevious] = useState<string>("")
    const [input, setInput] = useState<string>("")

    const terminalRef = useRef<HTMLDivElement>(null)
    const historyRef = useRef<HTMLParagraphElement>(null)
    const preRef = useRef<HTMLPreElement>(null)

    const standardText = "<span class='name'>guest</span><span class='at'>@</span><span class='location'>~/maxwell/portfolio</span><span class='symbols'> $ </span>"

    // firebase api key is *not* sensitive info
    const firebaseConfig = {
        apiKey: "AIzaSyC5UksLfFAB6nB8AewhkEkXIgBQIkaHf0Y",
        authDomain: "messages-2818b.firebaseapp.com",
        projectId: "messages-2818b",
        storageBucket: "messages-2818b.appspot.com",
        messagingSenderId: "174919313993",
        appId: "1:174919313993:web:375b27233c7d8d5ecdad98"
      };

    const app = initializeApp(firebaseConfig)
    const db = getDatabase(app)


    useEffect(() => {
        if(preRef.current != null) {
            preRef.current.innerHTML = standardText
        }
    }, [])

    useEffect(() => {
        if(historyRef.current != null) {
            historyRef.current.innerHTML = previous
        }

        if(terminalRef.current != null) {
            terminalRef.current.scrollTo(0, terminalRef.current.scrollHeight)
        }
    }, [previous])

    const handleCommandInput = async (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            const command = input.split(" ")[0]
            let result = ""

            setInput("")
            switch(command.toLowerCase()) {
                case "welcome":
                    result = "<br><br>" + welcomeCommand() + "<br>"
                    break
                case "about":
                    result = "<br><br>" + aboutCommand() + "<br>"
                    break
                case "projects":
                    result = "<br><br>" + projectsCommand() + "<br>"
                    break
                case "contact":
                    result = "<br><br>" + contactCommand() + "<br>"
                    break
                case "message":
                    const email = input.split(" ")[1]
                    const message = input.substring(input.indexOf('"') + 1, input.lastIndexOf('"'))

                    if(email == null || message == null || message.length < 1) {
                        result = "<br><br>Incorrect usage of message command,<br>correct usage: message youremail@gmail.com \"your message here, within quotations!\"<br>"
                        break
                    } else {
                        result = "<br><br>" + await messageCommand(email, message) + "<br>"
                        break
                    }

                case "clear":
                    setPrevious("")
                    return
                case "help":
                    result = "<br><br>" + helpCommand() + "<br>"
                    break
                case "":
                    break
                default:
                    result = `<br><br> '${command}' is not a valid command,<br>type 'help' to see the list of commands. <br>`
            }
            setPrevious(previous + standardText + input + result + "<br>")
        }
     }

    const messageCommand = async (email: string, message: string) => {
        let result = "Message successfully sent!"
        const dbRef = ref(db, "/messages")
        await push(dbRef, {email: email, message: message})
        .catch(e => {
            result = "Message couldn't be sent, Error: " + e.message + "<br>Apologies for the inconvenience, please email me at: cs.max@outlook.com"
        })
        return result
    }

    const contactCommand = () => {
        return "You can email me at: <u>cs.max@outlook.com</u><br><br>Or you can send me a message right now using the 'message' command<br><br>&nbsp&nbspUsage:<br>&nbsp&nbsp&nbsp message your_email@gmail.com \"type your message (make sure to use quotation marks around the message)\""
    }

    const projectsCommand = () => {
        const socialMedia = "<u>Social Media</u><br><br>&nbsp&nbspSimple social media platform that allows anyone to create an account, <br>&nbsp&nbsppost a message, reply to others, like/comment on posts, and more.<br><br>&nbsp&nbsp&nbspLive Site - <a href='https://social-chat-project.web.app' target='_blank'>https://social-chat-project.web.app</a> <br>&nbsp&nbsp&nbspRepository - <a href='https://github.com/robertsmaxwell/chat' target='_blank'>https://github.com/robertsmaxwell/chat</a>"
        const weatherDashboard = "<u>Weather Dashboard</u><br><br>&nbsp&nbspWeather dashboard that allows you to search any city and get a weekly/hourly forecast.<br>&nbsp&nbspUtilizies two separate third-party APIs for city search/autocomplete and retrieving weather data.<br><br>&nbsp&nbsp&nbspLive Site - <a href='https://robertsmaxwell.github.io/weather' target='_blank'>https://robertsmaxwell.github.io/weather</a><br>&nbsp&nbsp&nbspRepository - <a href='https://github.com/robertsmaxwell/weather' target='_blank'>https://github.com/robertsmaxwell/weather</a>"

        return socialMedia + "<br><br>" + weatherDashboard + "<br><br> Check out more of my projects on GitHub - <a href='https://github.com/robertsmaxwell' target='_blank'>https://github.com/robertsmaxwell</a>"
    }

    const aboutCommand = () => {
        return "Hey! My name's Maxwell Roberts, I'm a Frontend Developer that mainly uses the React Framework.<br>I've been programming for over 2 years and I enjoy writing clean and efficient code. I like to stay up<br>to date on things like React, Redux, TypeScript, Python, and more.<br><br>Here are some of my social profiles,<br><br>&nbsp&nbspGitHub - <a href='https://github.com/robertsmaxwell' target='_blank'>https://github.com/robertsmaxwell</a><br>&nbsp&nbspLinkedIn - <a href='https://linkedin.com/in/robertsmaxwell' target='_blank'>https://linkedin.com/in/robertsmaxwell</a>"
    }

    const helpCommand = () => {
        return "List of commands:<br><br>&nbsp&nbsp'about' - Get to know a little about me<br>&nbsp&nbsp'projects' - View a list of my recent projects<br>&nbsp&nbsp'contact' - Get in touch with me<br>&nbsp&nbsp'clear' - Clear the terminal screen<br>&nbsp&nbsp'welcome' - The welcome message<br>&nbsp&nbsp'help' - List of commands"
    }

    const welcomeCommand = () => {
        const fancyMessage = `<pre class='fancy'>
██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝</pre><br>`

        const normalMessage = `<pre>    Type 'about' to learn more about me<br>    Type 'projects' to see some of my recent projects<br>    Type 'contact' to get in touch<br><br>    Type 'help' to see the full list of commands<pre>`

        return fancyMessage + normalMessage
    }

    return (
        <div className="terminal" ref={terminalRef}>
            <p ref={historyRef} />
            <div className="input_line">
                <pre ref={preRef} />
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCommandInput} autoFocus onBlur={e => e.target.focus()} />
            </div>
        </div>
    );
}

export default Terminal;