import { Transaction } from '../../modules/transactions/interfaces/transaction.interface';

export function completedTransactionMessage(tx: Transaction): string {
	return `4A5 <b>Новая завершённая транзакция!</b>\n\n<b>ID:</b> <code>${tx.id}</code>\n<b>Сумма:</b> <b>${tx.amount}</b>\n<b>Дата:</b> <i>${new Date(tx.created_at).toLocaleString('ru-RU')}</i>`;
}
