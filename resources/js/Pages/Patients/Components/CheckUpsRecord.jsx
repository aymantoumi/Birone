import Modal from "@/Components/Modal";

export default function ChackUpsRecord({ data, onClose, actionType, show }) {
    return (
        <Modal show={show} onClose={onClose}>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>N</th>
                            <th>Visit Type</th>
                            <th>Results</th>
                            <th>Notes</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>something</td>
                                <td>test</td>
                                <td>test</td>
                                <td>2025-4-15</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}