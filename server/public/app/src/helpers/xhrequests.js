export const get = async (url) => {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'default'
    };

    const data = await fetch(url, options); // axios

    try {
        const json = await data.json();
        return { json, data };
    }
    catch (error) {
        return error;
    }
};

export const post = async (url, body) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'default',
        body
    };

    const data = await fetch(url, options);

    try {
        const json = await data.json();
        return { json, data };
    }
    catch (error) {
        return error;
    }
};

export const put = async (url, body) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(body)
    };

    const data = await fetch(url, options);
    try {
        const json = await data.json();
        return { json, data };
    }
    catch (error) {
        return error;
    }
};

export const XHRdelete = async (url, body) => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'default',
        body
    };

    const data = await fetch(url, options);

    try {
        const json = await data.json();
        return { json, data };
    }
    catch (error) {
        return error;
    }
};
