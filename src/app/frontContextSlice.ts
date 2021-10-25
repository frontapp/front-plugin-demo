import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./store";

export interface FrontContext {
	conversation?: {
		recipient: {
			handle: string;
		}
	};
	listMessages: () => Promise<{
		results: {
			to: [{
				handle: string
			}],
			from: {
				handle: string
			},
			cc: [{
				handle: string
			}],
			bcc: [{
				handle: string
			}]
		}[]
	}>;
}

const initialState: { frontContext: FrontContext | null } = {
	frontContext: null
}
export const FrontContextSlice = createSlice({
	name: 'frontContext',
	initialState,
	reducers: {
		setFrontContext(state, action: PayloadAction<any>) {
			state.frontContext = action.payload;
		}
	}
});

export const { setFrontContext } = FrontContextSlice.actions;

export const frontContextSelector = (state: RootState):  FrontContext | null => state.front.frontContext

export default FrontContextSlice.reducer;
