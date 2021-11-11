function e(e,t,i,s){Object.defineProperty(e,t,{get:i,set:s,enumerable:!0,configurable:!0})}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire6a04;t.register("HVM7K",(function(i,s){e(i.exports,"ViewLogs",(()=>r));var n=t("aD10K");t("kRfZQ");var o=t("2KwL0");class r extends n.LitElement{static styles=n.css`
    :host{
        background:white;
        display:flex;
        width:100%;
        height:100%;
        overflow-y:auto;
    }
    main{
        height: 100%;
        max-height: 100%;
        overflow-y: auto;
        flex-grow: 8;
        flex: 5;
    }
    aside{
        contain:strict;
        height: 100%;
        max-width: 20vw;
        min-width: 200px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-right: solid 1px var(--lt-color-gray-900);
        flex: 1;
    }
    aside > *{
        margin-top:10px;
    }
    aside p
    {
        margin-bottom: 0;
        font-weight: bold;
        margin-top: 40px;
    }

    ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0;
        max-width: 30vw;
        justify-content: space-between;
    }
    ul >*{
        flex-grow:1;
    }
    input{
        padding: 10px 5px;
        border-radius: 10px;
        border: 1px solid var(--lt-color-gray-400);
    }
    table{
        padding: 20px;  
        border-spacing: 10px 5px;
    }
    .heading{
        position:sticky;
        top:0px;
        background:white;
        padding:20px;
    }
    tr{
        margin: 20px 0px;
    }
    
    `;static properties={filter:{type:String},logs:{attribute:!1},components:{attribute:!1}};connectedCallback(){super.connectedCallback(),this.filter="",this.logs=[],this.components=[],this.logs=o.LogsObserver.LOG_ELEMENTS,this.components=o.LogsObserver.LOG_COMPONENT,o.LogsObserver.on("newLogs",(e=>{this.requestUpdate("logs")})),o.LogsObserver.on("newComponent",(e=>{this.requestUpdate("components")}))}logRow(e){return n.html`
            <tr>
                <td>${e.date.getHours()}:${e.date.getMinutes()}:${e.date.getSeconds()}</td>
                <td>${e.component}</td>
                <td>${e.log}</td>
            </tr>
        `}get renderlist(){let e=this.logs;this.filter&&(e=e.filter((e=>e.raw.includes(this.filter))));const t=Array.from(this.renderRoot.querySelectorAll("pill-toggle.active")).map((e=>e.textContent));return t.length>0&&(e=e.filter((e=>t.includes(e.component)))),e}logComponentFilter(e){return n.html`
            <pill-toggle>${e}</pill-toggle>
        `}render(){return n.html`
        <aside>
            <input placeholder="filter" value="${this.filter}" @change=${e=>this.filter=e.target.value}>
            <p>Components</p>
            <ul @click=${()=>{this.requestUpdate("logs")}}>
                ${this.components.map(this.logComponentFilter)}
            </ul>

        </aside>
        <main>
            <table>
                <tr class="heading">
                    <th>Time</th>
                    <th>Component</th>
                    <th>Message</th>
                </tr>
                ${this.renderlist.map((e=>this.logRow(e)))}
            </table>
        </main>
    `}}customElements.define("view-logs",r)})),t.register("2KwL0",(function(i,s){e(i.exports,"LogsObserver",(()=>l));var n=t("cud2N"),o=t("vbrOd");class r extends o.GenericDispatcher{constructor(){super(),this.LOG_ELEMENTS=[],this.LOG_MODULES=[],this.LOG_COMPONENT=[],n.Client.on("log",(e=>this.guessLogLine(e.value)))}parseDate(e){const t=e.split(" "),i=t[0].split(".");return new Date(`${i[2]}-${i[1]}-${i[0]}T${t[1]}`)}detectType(e,t){return/Set state:/.exec(t)&&e.includes("main")?TYPE_VPN_STATE:/Setting state:/.exec(t)&&e.includes("controller")?TYPE_CONTROLLER_STATE:null}guessLogLine(e){if(0===e.length||"["!==e[0])return;const t=e.indexOf("]");if(-1===t)return;const i=e.slice(1,t),s=(e=e.slice(t+1).trim()).indexOf("(");if(-1===s)return;const n=(e=e.slice(s)).indexOf(")");if(-1===n)return;const o=e.slice(1,n),r=e.slice(n+1).trim(),l=o.indexOf(" - ");if(-1===l)return;const a=o.slice(0,l).split("|"),d=o.slice(l+3),p={date:this.parseDate(i),detectedType:this.detectType(a,r),modules:a,component:d,log:r};this.LOG_ELEMENTS.push(p),this.LOG_ELEMENTS.length>200&&this.LOG_ELEMENTS.shift();for(const e of a)this.LOG_MODULES.includes(e)||(this.LOG_MODULES.push(e),this.emit({type:"newModule",entry:e,list:this.LOG_MODULES}));this.LOG_COMPONENT.includes(d)||(this.LOG_COMPONENT.push(d),this.emit({type:"newComponent",entry:d,list:this.LOG_COMPONENT})),this.emit({type:"newLogs",entry:p,list:this.LOG_ELEMENTS})}}const l=new r}));
//# sourceMappingURL=logs.77bf1aac.js.map
