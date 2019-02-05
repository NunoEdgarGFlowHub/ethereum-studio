// Copyright 2019 Superblocks AB
//
// This file is part of Superblocks Lab.
//
// Superblocks Lab is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation version 3 of the License.
//
// Superblocks Lab is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Superblocks Lab.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';
import style from './style.less';
import {
    IconCopy
} from '../../icons';
import TextInput from '../../textInput';
import { Tooltip } from '../../common';
import Switch from 'react-switch';

interface IProps {
    ipfsUrl: string;
}

interface IState {
    shareUrl: string;
    options: {
        hideExplorer: boolean;
        showTransactions: boolean;
        showAppview: boolean;
        [key: string]: boolean;
    };
}

export default class ShareDialog extends React.Component<IProps, IState> {

    state: IState = {
        shareUrl: this.props.ipfsUrl || String(window.location),
        options: {
            hideExplorer: false,
            showTransactions: false,
            showAppview: false,
        }
    };

    RenderOptions = () => {
        const { hideExplorer, showTransactions, showAppview } = this.state.options;

        return(
            <React.Fragment>
                <div className={classNames([style.inputContainer, style.optionInput])}>
                    <p>Hide Explorer</p>
                    <Switch
                        checked={hideExplorer}
                        onChange={() => {
                                this.setState({options: { ...this.state.options, hideExplorer: !hideExplorer }}, () => {
                                        this.updateUrl();
                                    }
                                );
                            }
                        }
                        onColor='#8641F2'
                        className={style.switch}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={20}
                        width={40}
                    />
                </div>
                <div className={classNames([style.inputContainer, style.optionInput])}>
                    <p>Show Transactions</p>
                    <Switch
                        checked={showTransactions}
                        onChange={() => {
                               this.setState({options: { ...this.state.options, showTransactions: !showTransactions, showAppview: false }}, () => {
                                        this.updateUrl();
                                    }
                               );
                               this.updateUrl();
                           }
                        }
                        onColor='#8641F2'
                        className={style.switch}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={20}
                        width={40}
                    />
                </div>
                <div className={classNames([style.inputContainer, style.optionInput])}>
                    <p>Show Appview</p>
                    <Switch
                        checked={showAppview}
                        onChange={() => {
                                this.setState({options: { ...this.state.options, showAppview: !showAppview, showTransactions: false }}, () => {
                                        this.updateUrl();
                                    }
                                );
                            }
                        }
                        onColor='#8641F2'
                        className={style.switch}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={20}
                        width={40}
                    />
                </div>
            </React.Fragment>
        );
    }

    updateUrl = () => {
        const { options } = this.state;
        const params = Object.keys(options).map( async (key) => {
            return key + '=' + Number(options[key]);
        });

        Promise.all(params).then((result) => {
            this.setState({
                shareUrl: this.props.ipfsUrl + '?' + result.join('&')
            });
        });
    }

    copyShareUrl = (shareUrl: string) => {
        copy(shareUrl);
    }

    getEmbedUrl = () => {
        return `<iframe src="${this.state.shareUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"></iframe>`;
    }

    getBtnMdUrl = () => {
        return `[![Edit Project](https://superblocks.com/static/img/open-superblocks.svg)](${this.state.shareUrl})`;
    }

    getBtnHtmlUrl = () => {
        return `<a href="${this.state.shareUrl}"><img alt="Edit Project" src="https://superblocks.com/static/img/open-superblocks.svg"></a>`;
    }

    RenderInputs = () => {
        const { hideExplorer, showTransactions, showAppview } = this.state.options;
        const { shareUrl } = this.state;
        const embedUrl = this.getEmbedUrl();
        const btnMdUrl = this.getBtnMdUrl();
        const btnHtmlUrl = this.getBtnHtmlUrl();

        return(
            <React.Fragment>
                <div className={style.inputContainer}>
                    <TextInput
                        id='editor'
                        label='Editor'
                        value={shareUrl}
                        disabled={false}
                        readOnly={true}
                    />
                    <button className='btnNoBg' onClick={() => copy(shareUrl)}>
                        <Tooltip title='Copy URL'>
                            <IconCopy />
                        </Tooltip>
                    </button>
                </div>
                <div className={style.inputContainer}>
                    <TextInput
                        id='embed'
                        label='Embed'
                        value={embedUrl}
                        disabled={false}
                        readOnly={true}
                    />
                    <button className='btnNoBg' onClick={() => copy(embedUrl)}>
                        <Tooltip title='Copy URL'>
                            <IconCopy />
                        </Tooltip>
                    </button>
                </div>
                <div className={style.inputContainer}>
                    <TextInput
                        id='button-md'
                        label='Button Markdown'
                        value={btnMdUrl}
                        disabled={false}
                        readOnly={true}
                    />
                    <button className='btnNoBg' onClick={() => copy(btnMdUrl)}>
                        <Tooltip title='Copy URL'>
                            <IconCopy />
                        </Tooltip>
                    </button>
                </div>
                <div className={style.inputContainer}>
                    <TextInput
                        id='button-html'
                        label='Button HTML'
                        value={btnHtmlUrl}
                        disabled={false}
                        readOnly={true}
                    />
                    <button className='btnNoBg' onClick={() => copy(btnHtmlUrl)}>
                        <Tooltip title='Copy URL'>
                            <IconCopy />
                        </Tooltip>
                    </button>
                </div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className={style.shareDialogContainer}>
                <div className={style.content}>
                    {this.RenderOptions()}
                    {this.RenderInputs()}
                </div>
            </div>
        );
    }
}
