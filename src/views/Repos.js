import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { signOut as signOutAction } from '../actions/authActions';
import CreateRepositoryModal from '../components/CreateRepositoryModal';

const Repos = ({ signOut, authReducer }) => {
    const [repositories, setRepos] = useState([]);
    const [createVisible, setCreateVisible] = useState(false);
    const [requestPending, setRequestPending] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    const { signOutError } = authReducer;
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const fetchRepos = () => {
        setRequestPending(true);
        setFetchError(false);

        const baseURL = 'https://api.github.com';
        let repos = [];
        axios.get(`${baseURL}/user/repos`, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                repos = result.data;
            })
            .then(() => {
                const promiesesArray = [];
                repos.forEach((repo, index) => {
                    const repoPromise = axios.get(
                        `${baseURL}/repos/${user}/${repo.name}/commits`,
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
                    })
                    .catch(() => {
                        setFetchError(true);
                    });
            })
            .catch(() => {
                setFetchError(true);
            });
    };

    useEffect(() => {
        fetchRepos();
        // eslint-disable-next-line
    }, []);

    const toggleModal = () => {
        setCreateVisible(!createVisible);
    };

    return (
        <section className="repos">
            {
                createVisible
                && (
                    <CreateRepositoryModal
                        toggleModal={toggleModal}
                        fetchRepos={fetchRepos}
                    />
                )
            }
            <nav>
                <button type="button" onClick={signOut}>Sign out</button>
                <button type="button" onClick={fetchRepos} disabled={requestPending}>Refresh list</button>
                <button type="button" onClick={toggleModal} disabled={requestPending}>Create new repository</button>
            </nav>
            {
                signOutError
                && (
                    <p className="repos-error">Error occured, could not log you out</p>
                )
            }
            <h2>
                {`Repositories of ${user}`}
            </h2>
            {
                requestPending
                && (
                    <p>Downloading data...</p>
                )
            }
            {
                fetchError
                    ? <p className="repos-error">Something went wrong. Please, try again later</p>
                    : (
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

Repos.propTypes = {
    signOut: PropTypes.func.isRequired,
    authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repos);
