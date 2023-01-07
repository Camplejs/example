import { addition, animationComponent, cample, component, cycle, ifComponent, ternary } from "cample";

const header = component(
  "header-component",
  `<header class="example_header">
        <a href="#">
            <div>
                <span class="example_logo_text">{{logo_text}}</span>
            </div>
        </a>
        <ul class="example_menu">
            <li><a href="#">{{link1}}</a></li>
            <li><a href="#">{{link2}}</a></li>
        </ul>
    </header>`,
  {
    data: {
      logo_text: "Logo",
      link1: "link1",
      link2: "link2",
    },
    style: `
            #example{
                height:calc(100% - 23px);
            }
            .example_page{
                display:flex;
                flex-direction:column;
                height:100%;
            }
            .example_page content-component{
                flex-grow:2;
                text-align:center;
            }
            .example_header{
                display:flex;
                align-items:center;
                padding:20px;
            }
            .example_logo_text{
                font-size:60px;
            }
            .example_menu{
                display:flex;
                gap:10px;
                margin-left:auto;
            }
        `,
  }
);

const item = component(
  "item-component",
  `
        <div>
            {{item}}
        </div>
    `,
  {
    data: {
      item: {
        value: ["item1"],
        defaultValue: "item",
      },
    },
  }
);
const cycleComponent = cycle("cycle-component", ["item-component"], 3, {
  element: {
    selector: "div",
    class: "example_items",
  },
});
const text = component(
  "text-component",
  `
        <div class="example_text">
            <span class="example_text_text">{{text_text}}</span>
        </div>
    `,
  {
    style: `
            .example_text{
                display:flex;
                align-items:center;
                margin:auto;
            }
            .example_text_text{
                margin:auto;
                cursor:pointer;
                font-size:30px;
            }
        `,
    data: {
      text_text: "Click!",
    },
  }
);
const text1 = component("text1-component", "Text1");
const text2 = component("text2-component", "Text2");
const animation = animationComponent(
  "animation-component",
  "text-component",
  {
    event: "toggle",
    styleAnimation: `
            text-shadow: gray 0 0 5px;
        `,
    class: "animation-class",
    element: {
      selector: "div",
      class: "example_text_element",
      transition: `1s text-shadow`,
    },
    style: `
            .example_text_element{
                margin:auto;
                width:fit-content;
            }
        `,
  }
);
const additionComponent = addition("addition-component", [
  "text1-component",
  "text2-component",
]);
const newIf = ifComponent("if-component", ["text1-component"], true);
const ternaryComponent = ternary(
  "ternary-component",
  ["text1-component", "text2-component"],
  true
);
const inputComponent = component("input-component",`
  <span>Texts:{{textValue}}<br/></span>
  <label data-value="{{inputValue}}">{{inputValue}}</label><br/>
  <input id="textInput" name="input" value="{{inputValue}}" />
  <button id="addText">Add text</button>
`,  {
    script:[(elements,functions)=>{
      const inputFunction = (e) =>{
          functions?.inputFunction(data=>{
            return{...data,value:e.target.value}
          });
          elements?.input?.removeEventListener("input",inputFunction);
          elements?.addText?.removeEventListener("click",addFunction);
      }
      elements?.input?.addEventListener("input",inputFunction);

      const addFunction = () =>{
        const component = document.querySelector("input-component");
        const newEl = document.createElement("label");
        newEl.setAttribute("data-value","{{inputValue}}")
        newEl.innerHTML="{{inputValue}}";
        const newBr = document.createElement("br");
        component.insertBefore(newEl,elements?.input);
        component.insertBefore(newBr,elements?.input);
        functions?.addFunction(data=>{
          return{...data,value:data.value+1}
        });
        elements?.input?.removeEventListener("input",inputFunction);
        elements?.addText?.removeEventListener("click",addFunction);
      }
      elements?.addText?.addEventListener("click",addFunction);
  },
  {
      start:'afterLoad',
      elements:[
          {input:"#textInput"},
          {addText:"#addText"}
      ]
  }],
  data: {
    inputValue: {
      value: "Text here",
      function: "inputFunction",
    },
    textValue:{
      value:1,
      function:"addFunction"
    }
  },
})
const content = component(
  "content-component",
  `
        <h2>Content:</h2>
        <div class="example_content">
            <div>
                <h3>Cycle:</h3>
                <cycle-component></cycle-component>
            </div>
            <div>
                <h3>Animation:</h3>
                <animation-component></animation-component>
            </div>
            <div>
                <h3>Operators:</h3>
                <h4>Addition:</h4>
                <text1-component></text1-component>
                +
                <text2-component></text2-component>
                =
                <addition-component></addition-component>
                <h4>If:</h4>
                if(true) <if-component></if-component>
                <h4>Ternary:</h4>
                true ? Text1 : Text2 = <ternary-component></ternary-component>
            </div>
        </div>
        <input-component></input-component>
    `,
  {
    style: `
            .example_content{
                display:grid;
                grid-template-columns:repeat(3,1fr);
            }
        `,
  }
);
const footer = component(
  "footer-component",
  `
        <footer class="example_footer">
            Example of a <a href="https://www.npmjs.com/package/cample" target="_blank" rel="noopener noreferrer">Cample.js</a> work. 2022-${new Date().getFullYear()}
        </footer>
    `,
  {
    style: `
            .example_footer{
                padding:20px;
            }
        `,
  }
);
cample("#example").render(
  `
        <div class="example_page">
            {{header}}
            {{content}}
            {{footer}}
        </div>
    `,
  {
    header,
    content,
    inputComponent,
    cycleComponent,
    item,
    animation,
    text,
    additionComponent,
    newIf,
    ternaryComponent,
    text1,
    text2,
    footer,
  }
);
