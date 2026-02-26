import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/utility/icons';
import { useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';
import { Separator } from '@/components/ui/separator';
import { FROM_TO_PATH_MAP, GO_BACK_PATHS } from '@/constants/backLinksMap';

/**
 * A "Go back" button that navigates to the previous page.
 * The previous page is determined by the `from` search parameter, the current location, or a combination of both.
 * It uses a predefined map to determine the back link.
 * If no back link can be determined, the button is not rendered.
 *
 * @returns A "Go back" button, a separator, or null.
 */
export const BackButton = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const from = searchParams.get('from');
  const institutionId = searchParams.get('id');

  const backLink = useMemo(() => {
    if (Object.keys(GO_BACK_PATHS).includes(location.pathname)) {
      return GO_BACK_PATHS[location.pathname];
    }

    if (from === 'institution' && institutionId) {
      return `/institution/${institutionId}?section=courses`;
    }

    return from ? FROM_TO_PATH_MAP[from] : null;
  }, [from, institutionId, location.pathname]);

  if (!backLink) {
    return null;
  }

  return (
    <>
      <Button asChild size={'sm'}>
        <Link to={backLink}>
          <Icons.chevronLeft className="mr-1 h-4 w-4" />
          Go back
        </Link>
      </Button>

      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-6"
      />
    </>
  );
};
