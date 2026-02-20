import axios from 'axios';

export default function catchErrorResponse(
  error: unknown,
  message?: string
): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return (
        error.response.data?.message || 'An error occurred. Please try again.'
      );
    } else if (error.request) {
      return 'No response received from the server. Please check your network connection.';
    } else {
      return `Request setup error: ${error.message}`;
    }
  } else {
    return message || 'An unexpected error occurred. Please try again.';
  }
}
