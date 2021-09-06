const foreach = <T extends unknown>(arr: T[], func: (arg0?: any) => any): void => {
    for (let i = 0; i < arr.length; i++)
        func(arr[i]);
}



export { foreach }