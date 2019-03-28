import React, { Component } from "react";
import ResultItem from "./ResultItem.js";
import PropTypes from "prop-types";
import Select from "react-select";
import styled from "styled-components";

const SelectWrapper = styled.div`
    padding: 1rem;
`;

export default class ResultSidebar extends Component {
    static propTypes = {
        displayed: PropTypes.bool,
        loading: PropTypes.bool,
        suggestions: PropTypes.array,
        removeSuggestion: PropTypes.func.isRequired,
        takeSuggestion: PropTypes.func.isRequired,
        onHoverSuggestion: PropTypes.func.isRequired,
        authorOptions: PropTypes.array,
        selectedAuthorOptions: PropTypes.array,
        onChangeAuthors: PropTypes.func.isRequired
    };

    render() {
        return (
            <div
                className={
                    this.props.displayed
                        ? "sidebar-container sidebar-displayed"
                        : "sidebar-container"
                }
            >
                <SelectWrapper>
                    <Select
                        value={this.props.selectedAuthorOptions}
                        onChange={this.props.onChangeAuthors}
                        options={this.props.authorOptions}
                        isMulti={true}
                    />
                </SelectWrapper>
                {this.props.suggestions.map(
                    ({ source, tone, text, author, image, id }, index) => {
                        return (
                            <ResultItem
                                tone={tone}
                                author={author}
                                quote={text}
                                original={source}
                                image="https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_400x400.jpg"
                                key={index}
                                id={id}
                                removeSuggestion={this.props.removeSuggestion}
                                takeSuggestion={this.props.takeSuggestion}
                                onHoverSuggestion={this.props.onHoverSuggestion}
                            />
                        );
                    }
                )}
            </div>
        );
    }
}
