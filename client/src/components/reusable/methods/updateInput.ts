const updateInput = (e : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>  {
    const inputName = e.target.id.replace('-input', '');
    eval(`set${inputName.charAt(0).toUpperCase()}${inputName.slice(1)}('${e.target.value}')`);
}

export {updateInput};