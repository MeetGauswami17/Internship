
# TicketDesk QA Checklist

## Submit Ticket Form

- [ ] 50,000-character description displays correctly.
- [ ] Character counter updates correctly.
- [ ] Textarea scrolls correctly.
- [ ] Long description can be submitted.
- [ ] Description above 5,000 characters displays a warning.
- [ ] Whitespace-only subject is rejected.
- [ ] Whitespace-only description is rejected.
- [ ] Newline-only description is rejected.

## Email Validation

- [ ] a@b is rejected.
- [ ] Uppercase email is accepted.
- [ ] Email with trailing spaces is accepted.
- [ ] Email is stored in lowercase without spaces.

## Submission Behaviour

- [ ] Spinner appears during submission.
- [ ] Submit button is disabled while submitting.
- [ ] Multiple clicks do not create duplicate tickets.
- [ ] Navigating away during submission does not cause crashes or console errors.

## Dashboard

- [ ] Long 300-character subject displays correctly.
- [ ] Subject text wraps or truncates properly.

## Accessibility and Responsive Design

- [ ] Form works using keyboard navigation.
- [ ] Tab and Shift+Tab work correctly.
- [ ] Enter submits a valid form.
- [ ] Layout works at 375px screen width.

## Final Checks

- [ ] npm run build completes successfully.
- [ ] One clean ticket submission works.
- [ ] README contains screenshots.
- [ ] Changes committed to GitHub.
