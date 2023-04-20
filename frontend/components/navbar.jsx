"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nav_1 = require("react-bootstrap/Nav");
var Navbar_1 = require("react-bootstrap/Navbar");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
function NavBar() {
    var _a = (0, react_1.useState)(false), scrolled = _a[0], setScrolled = _a[1];
    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    });
    var isActive = function (path) {
        return path === location.pathname;
    };
    return (<Navbar_1.default expand="lg" fixed="top" variant="dark" className={"py-3 ".concat(scrolled ? "bg-black" : "bg-transparent", " transition-bg")}>
      <react_bootstrap_1.Container fluid="lg">
        <Navbar_1.default.Brand className=" align-items-center" as={react_router_dom_1.Link} to="/home">
          NASA Renewable Energy Data
        </Navbar_1.default.Brand>
        <Navbar_1.default.Toggle aria-controls="navbar-nav"/>
        <Navbar_1.default.Collapse id="navbar-nav" className="justify-content-end">
          <Nav_1.default className="mr-auto  align-items-center">
            <Nav_1.default.Link as={react_router_dom_1.Link} to="/home" className={"px-lg-3 ".concat(isActive("/home") ? "active" : "")}>
              Home
            </Nav_1.default.Link>
            <Nav_1.default.Link as={react_router_dom_1.Link} to="/data" className={"px-lg-3 ".concat(isActive("/data") ? "active" : "")}>
              Data
            </Nav_1.default.Link>
            <Nav_1.default.Link as={react_router_dom_1.Link} to="/visualizations" className={"px-lg-3 ".concat(isActive("/visualizations") ? "active" : "")}>
              Visualizations
            </Nav_1.default.Link>
            <Nav_1.default.Link as={react_router_dom_1.Link} to="/documents" className={"ps-lg-3 ".concat(isActive("/documents") ? "active" : "")}>
              API
            </Nav_1.default.Link>
          </Nav_1.default>
        </Navbar_1.default.Collapse>
      </react_bootstrap_1.Container>
    </Navbar_1.default>);
}
exports.default = NavBar;
