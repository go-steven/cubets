const util = require('util');

export const ReplaceAll = (s: string, old: string, newVal: string): string => {
    return s.replace(new RegExp(old, "igm"), newVal);
}