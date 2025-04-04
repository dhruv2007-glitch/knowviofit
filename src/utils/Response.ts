export type ApiResponse<T> = {
	status: "success" | "error";
	message: string;
	data?: T;
	error?: string | null;
};

export const successResponse = <T>(
	message: string,
	data?: T,
): ApiResponse<T> => {
	return { status: "success", message, data };
};

export const errorResponse = (
	message: string,
	error?: string,
): ApiResponse<null> => {
	return { status: "error", message, error: error || null };
};
