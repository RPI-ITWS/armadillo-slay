function APISection() {

    return (
        <>
            <pre className="landing-code">
                            <code>
                                { /* Syntax highlighting styles */}
                                <span className="keyword">fetch</span>
                                <span
                                    className="string">('https://armadilloslay.eastus.cloudapp.azure.com/api/weather?location=:location')</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">then</span>
                                <span className="operator">(</span>
                                <span className="keyword">response</span>
                                <span className="operator">=&gt;</span>
                                <span className="keyword">response</span>
                                <span className="operator">.</span>
                                <span className="keyword">json</span>
                                <span className="operator">()</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">then</span>
                                <span className="operator">(</span>
                                <span className="keyword">data</span>
                                <span className="operator">=&gt;</span>
                                <span className="keyword">console</span>
                                <span className="operator">.</span>
                                <span className="keyword">log</span>
                                <span className="operator">(</span>
                                <span className="keyword">data</span>
                                <span className="operator">)</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">catch</span>
                                <span className="operator">(</span>
                                <span className="keyword">error</span>
                                <span className="operator">=&gt;</span>
                                <span className="keyword">console</span>
                                <span className="operator">.</span>
                                <span className="keyword">error</span>
                                <span className="operator">(</span>
                                <span className="keyword">error</span>
                                <span className="operator">)</span>
                                <span className="operator">)</span>
                            </code>
                        </pre>
            <pre className="landing-code">
                            <code>
                                { /* Syntax highlighting styles */}
                                <span className="keyword">$.ajax</span>
                                <span className="operator">(</span>
                                <span className="string">{"{"}</span>
                                <br></br>
                                <span className="string">"url":</span>
                                <span
                                    className="string">"https://armadilloslay.eastus.cloudapp.azure.com/api/weather?location=:location"</span>
                                <br></br>
                                <span className="string">"method":</span>
                                <span className="string">"GET"</span>
                                <br></br>
                                <span className="string">{"}"}</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">done</span>
                                <span className="operator">{"("}</span>
                                <span className="keyword">function</span>
                                <span className="operator">(</span>
                                <span className="keyword">response</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">{"{"}
                                </span>
                                <br></br>
                                <span className="keyword">console</span>
                                <span className="operator">.</span>
                                <span className="keyword">log</span>
                                <span className="operator">(</span>
                                <span className="keyword">response</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">{"}"}</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">fail</span>
                                <span className="operator">{"("}</span>
                                <span className="keyword">function</span>
                                <span className="operator">(</span>
                                <span className="keyword">error</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">{"{"}</span>
                                <br></br>
                                <span className="keyword">console</span>
                                <span className="operator">.</span>
                                <span className="keyword">log</span>
                                <span className="operator">(</span>
                                <span className="keyword">error</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">{"}"}</span>
                                <span className="operator">{")"}</span>
                            </code>
                        </pre>
        </>

    )
}

export {
    APISection
}