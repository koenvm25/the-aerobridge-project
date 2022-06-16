import { handleStatusColor } from '../Components/Timeline/TimelineItem';

test('should return the correct color', () => {
    expect(handleStatusColor("Available")).toBe("#028F68");
    expect(handleStatusColor("Broken")).toBe("#fc0303");
    expect(handleStatusColor("In Assembly")).toBe("#F4CF3F");
    expect(handleStatusColor("In Transit")).toBe("#021bfa");
})
