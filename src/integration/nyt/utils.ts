import { NytConstants } from "./external-types"

export const getNullableString = (value: string): string | null => (value === NytConstants.NONE) ? null : value 