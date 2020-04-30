import { MessageService } from "./message.service";

describe('Message Service', () => {
    let service: MessageService;

    // let's have a new service each time we run a test
    beforeEach(() => {
        service = new MessageService();
    });

    it('should have no messages at start', () => {
        expect(service.messages.length).toBe(0);
    });

    it('should add a message when add is called', () => {
        // add message
        service.add('new message');
        expect(service.messages.length).toBe(1)
    });

    it('should remove all messages when clear is called', () => {
        // add message
        service.add('new message2');

        service.clear();
        expect(service.messages.length).toBe(0)
    });
});