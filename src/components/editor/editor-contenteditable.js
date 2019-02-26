import React, { Component } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import TagButton from "../TagButton";

const TitleInput = styled.input`
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.fontColor.regular};
    padding: 2rem;
    margin-bottom: 0;
    font-size: 2rem;
    border: none;
    font-weight: bold;
    display: block;
    width: 100%;
    ${props => props.theme.reset.input}

    &::placeholder {
        color: ${props => props.theme.fontColor.regularPlaceholder};
    }
`;

const BodyContentEditable = styled(ContentEditable)`
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.fontColor.regular};
    padding: 0 2rem 2rem;
    font-size: 1.25rem;
    margin-top: 0;
    ${props => props.theme.reset.input}
`;

const EditorContenteditableWrapper = styled.div`
    width: 60%;
`;

export default class EditorContenteditable extends Component {
    static propTypes = {
        setText: PropTypes.func.isRequired,
        setTitle: PropTypes.func.isRequired,
        setEditorFocus: PropTypes.func.isRequired,
        title: PropTypes.string,
        text: PropTypes.string,
        highlighted: PropTypes.string,
        editing: PropTypes.bool,
        loading: PropTypes.bool
    };

    _placeholderText = 'My amazing text';
    _htmlInjections = [
        '<span style="color:#757575;">',
        '<span style="background-color:#FFB3B3">',
        '</span>'
    ];

    _getText = () => {
        const { text, editing } = this.props;
        if (!editing && !text) {
            return this._placeholderText;
        }
        return text;
    };

    _getHtmlFromText = (highlighted="") => {
        let text = this._getText();
        if (text) {
            if (highlighted && text.includes(highlighted)) {
                text = text.replace(highlighted, `<span style="background-color:#FFB3B3">${highlighted}</span>`);
            }
            return `<span style="color:#757575;">${text}</span>`;
        } else {
            return text;
        }
    };

    _getTextFromHtml = ( html ) => {
        this._htmlInjections.forEach((chunk) => {
            while(html.includes(chunk)) {
                html = html.replace(chunk, '');
            }
        })
        return html;
    };

    _onChangeTitle = e => {
        this.props.setTitle(e.target.value);
    };

    _onChangeBody = e => {
        this.props.setText(this._getTextFromHtml(e.target.value));
    };

    _onFocusBody = e => {
        this.props.setEditorFocus(true);
    };

    _onBlurBody = e => {
        this.props.setEditorFocus(false);
    };

    render() {
        const { title } = this.props;

        return (
            <EditorContenteditableWrapper>
                <TitleInput
                    name="EditorContenteditable__Title"
                    type="text"
                    value={title}
                    onChange={this._onChangeTitle}
                    placeholder="My Lovely Title"
                />
                <BodyContentEditable
                    className="EditorContenteditable__Body"
                    tagName="pre"
                    html={this._getHtmlFromText(this.props.highlighted)}
                    onFocus={this._onFocusBody}
                    onBlur={this._onBlurBody}
                    onChange={this._onChangeBody}
                />
            </EditorContenteditableWrapper>
        );
    }
}
