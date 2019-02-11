import React, { Component } from "react";
import DemoResultItem from "./DemoResultItem.js";
import PropTypes from "prop-types";

class DemoResultSidebar extends Component {
    static propTypes = {
        displayed: PropTypes.bool,
        suggestions: PropTypes.array,
        removeSuggestion: PropTypes.func.isRequired,
        takeSuggestion: PropTypes.func.isRequired
    };

    render() {
        console.log("Recieved to render: ");
        console.log(this.props.suggestions);
        return (
            <div
                className={
                    this.props.displayed
                        ? "sidebar-container sidebar-displayed"
                        : "sidebar-container"
                }
            >
            { this.props.suggestions.map(({ source, text, author, image, id }) => {
                return <DemoResultItem
                    author={author}
                    quote={text}
                    contextPrefix=""
                    original={source}
                    image="https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_400x400.jpg"
                    key={id}
                    id={id}
                    removeSuggestion={this.props.removeSuggestion}
                    takeSuggestion={this.props.takeSuggestion}
                />;
            })}
            </div>
        );
    }
}

export default DemoResultSidebar;
