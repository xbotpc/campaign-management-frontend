
export function generateSelectOptions(data: { [x: string]: string }[], idKey: string, valueKey: string, labelKey?: string) {
    return data?.map((datum) => ({
        id: datum[idKey],
        label: datum[labelKey || valueKey],
        value: datum[valueKey],
    }));
}