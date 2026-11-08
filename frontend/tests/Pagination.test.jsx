import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../src/components/filters/Pagination';

describe('Pagination', () => {
  it('calls onPageChange when navigating', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={2} pages={5} onPageChange={onPageChange} />);

    await user.click(screen.getByRole('button', { name: '3' }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('hides when only one page', () => {
    const { container } = render(<Pagination page={1} pages={1} onPageChange={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });
});
