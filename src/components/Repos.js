import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import axios from 'axios';

import { signOut } from '../actions/authActions';

import Create from './Create';

const Repos = (props) => {
    const [repositories, setRepos] = useState([]);
    const [createVisible, setCreateVisible] = useState(false);
    const [requestPending, setRequestPending] = useState(false);

    const fetchRepos = () => {
        setRequestPending(true);
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        let repos = [];
        axios.get('https://api.github.com/user/repos', { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                repos = result.data;
            })
            .then(() => {
                const promiesesArray = [];
                repos.forEach((repo, index) => {
                    const repoPromise = axios.get(
                        `https://api.github.com/repos/${user}/${repo.name}/commits`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )
                        .then((result) => {
                            repos[index].commits = result.data.length;
                        })
                        .catch(() => {
                            repos[index].commits = 0;
                        });
                    promiesesArray.push(repoPromise);
                });
                Promise.all(promiesesArray)
                    .then(() => {
                        setRepos(repos);
                        setRequestPending(false);
                    });
            });
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    const create = () => {
        setCreateVisible(true);
    };

    const closeModal = () => {
        setCreateVisible(false);
    };

    return (
        <section className="repos">
            {
                createVisible
                && (
                    <Create
                        closeModal={closeModal}
                        fetchRepos={fetchRepos}
                    />
                )
            }
            <nav>
                <button type="button" onClick={props.signOut}>Sign out</button>
                <button type="button" onClick={fetchRepos} disabled={requestPending}>Refresh list</button>
                <button type="button" onClick={create} disabled={requestPending}>Create new repository</button>
            </nav>
            <h2>
                {`Repositories of ${localStorage.getItem('user')}`}
            </h2>
            {
                requestPending
                && (
                    <p>Downloading data...</p>
                )
            }
            {
                !requestPending
                && (
                    repositories.map((item) => (
                        <article key={`item-${item.url}`}>
                            <p>
                                Repository name:
                                <span>{item.name}</span>
                            </p>
                            <p>
                                Description:
                                <span>{item.description}</span>
                            </p>
                            <p>
                                Repository url:
                                <span><a href={item.html_url} target="blank">{item.html_url}</a></span>
                            </p>
                            <p>
                                Star count:
                                <span>{item.stargazers_count}</span>
                            </p>
                            <p>
                                Number of commits:
                                <span>{item.commits}</span>
                            </p>
                        </article>
                    ))
                )
            }
        </section>
    );
};

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut()),
});

export default connect(null, mapDispatchToProps)(Repos);
