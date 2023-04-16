import "../styles/Terminal.css"

import React from 'react'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'

function Terminal () {
    const [previous, setPrevious] = useState<string>("")
    const [input, setInput] = useState<string>("")

    const terminalRef = useRef<HTMLDivElement>(null)
    const historyRef = useRef<HTMLParagraphElement>(null)
    const preRef = useRef<HTMLPreElement>(null)

    const standardText = "<span class='name'>guest</span><span class='at'>@</span><span class='location'>~/maxwell/portfolio</span><span class='symbols'> $ </span>"

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

    const handleCommandInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            const command = input
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

    const contactCommand = () => {
        return "You can email me at: <u>cs.max@outlook.com</u><br><br>Or you can send me a message right now using the 'message' command<br><br>&nbsp&nbspUsage:<br>&nbsp&nbsp&nbsp message your_email@gmail.com \"type your message (make sure to use quotation marks)\""
    }

    const projectsCommand = () => {
        const socialMedia = "<u>Social Media</u><br><br>&nbsp&nbspSimple social media platform that allows anyone to create an account, <br>&nbsp&nbsppost a message, reply to others, like/comment on posts, and more.<br><br>&nbsp&nbsp&nbspLive Site - https://social-chat-project.web.app <br>&nbsp&nbsp&nbspRepository - https://github.com/robertsmaxwell/chat"
        const weatherDashboard = "<u>Weather Dashboard</u><br><br>&nbsp&nbspWeather dashboard that allows you to search any city and get a weekly/hourly forecast.<br>&nbsp&nbspUtilizies two separate third-party APIs for city search/autocomplete and retrieving weather data.<br><br>&nbsp&nbsp&nbspLive Site - https://robertsmaxwell.github.io/weather<br>&nbsp&nbsp&nbspRepository - https://github.com/robertsmaxwell/weather"

        return socialMedia + "<br><br>" + weatherDashboard + "<br><br>" + "Check out more of my projects on GitHub - https://github.com/robertsmaxwell"
    }

    const aboutCommand = () => {
        return "Hey! My name's Maxwell Roberts, I'm a Frontend Developer that mainly uses the React Framework.<br>I've been programming for over 2 years and I enjoy writing clean and efficient code. I like to stay up<br>to date on things like React, Redux, TypeScript, Python, and more.<br><br>Here are some of my social profiles,<br><br>&nbsp&nbspGitHub - https://github.com/robertsmaxwell<br>&nbsp&nbspLinkedIn - https://linkedin.com/in/robertsmaxwell"
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