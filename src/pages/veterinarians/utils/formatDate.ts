export function formatDate(dateString: string | null) {
  if (!dateString) return 'N/A';

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  });
}
