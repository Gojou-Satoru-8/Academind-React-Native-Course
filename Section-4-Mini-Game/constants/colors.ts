// NOTE: This file is only for Typescript, it's presence is only to mute TS Errors which isn't an
// error.
// Explanation:
// In order to facilitate platform-specific colors, two files: colors.ios.ts and colors.android.ts
// are made, based on the same name, followed by the extension .android.ts and ios.ts.
// The import statement should specify the file name without .ios or .android, and React Native will
// intelligently import based on the platform.
// Thus, no need to specify separate imports from colors.android.ts or colors.ios.ts, just use:
// import {Colors, Shadows} from "../constants/colors"
// While expo will pick this up (and it is the recommended way), TS linter will show red lines (with
// the error being it can't find such a file). Hence this file colors.ts exists, with the necessary
// exports. Functionally, it's irrelevant.

import { Colors, Shadows } from "./colors.ios";
export { Colors, Shadows };
