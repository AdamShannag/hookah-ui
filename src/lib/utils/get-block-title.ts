export function getBlockTitle(type: string): string {
    const titles: Record<string, string> = {
        receiverBlock: "Receiver Node",
        authBlock: "Auth Node",
        conditionsBlock: "Conditions Node",
        eventBlock: "Event Node",
        hookBlock: "Hook Node",
        templateBlock: "Template Node",
    };

    return titles[type] || "Unknown Node";
}