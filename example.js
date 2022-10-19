import {
  Addition,
  AnimationComponent,
  Cample,
  Component,
  Cycle,
  If,
  Ternary,
  Route,
} from "cample";

const header = new Component(
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
const item = new Component(
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
const cycle = new Cycle("cycle-component", ["item-component"], 3, {
  element: {
    selector: "div",
    class: "example_items",
  },
});
const text = new Component(
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
                font-size:30px;
            }
        `,
    data: {
      text_text: "Click!",
    },
  }
);
const text1 = new Component("text1-component", "Text1");
const text2 = new Component("text2-component", "Text2");
const animation = new AnimationComponent(
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
const addition = new Addition("addition-component", [
  "text1-component",
  "text2-component",
]);
const newIf = new If("if-component", ["text1-component"], true);
const ternary = new Ternary(
  "ternary-component",
  ["text1-component", "text2-component"],
  true
);
const routeComponent = new Component("route-component", "route");
const route = new Route(
  "#route",
  "{{routeComponent}}",
  { routeComponent },
  "/example.html"
);
const content = new Component(
  "content-component",
  `
        <h2>Content:</h2>
        <div class="example_content">
            <div>
                <h3>Route:</h3>
                <div id="route"></div>
            </div>
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
    `,
  {
    style: `
            .example_content{
                display:grid;
                grid-template-columns:repeat(4,1fr);
            }
        `,
  }
);
const footer = new Component(
  "footer-component",
  `
        <footer class="example_footer">
            Example. ${new Date().getFullYear()} year.
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
const newCample = new Cample("#example");
newCample.render(
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
    cycle,
    item,
    animation,
    text,
    addition,
    newIf,
    ternary,
    text1,
    text2,
    footer,
  }
);
newCample.renderRoutes({ route });
