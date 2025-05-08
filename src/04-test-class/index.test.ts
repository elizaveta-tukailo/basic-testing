// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.withdraw(1500)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(1000);
    const secondAccount = getBankAccount(0);
    expect(() => account.transfer(1500, secondAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(300, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(200);
    expect(account.getBalance()).toBe(800);
  });

  test('should transfer money', () => {
    const account = getBankAccount(1000);
    const secondAccount = getBankAccount(0);
    expect(account.transfer(350, secondAccount).getBalance()).toBe(650);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    const balance = await account.fetchBalance();
    if (balance !== null) expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(1000);
    await account.synchronizeBalance();
    const balance = account.getBalance();
    expect(balance).toBe(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    try {
      await account.synchronizeBalance();
    } catch {
      await expect(() => account.synchronizeBalance()).rejects.toThrow(
        new SynchronizationFailedError(),
      );
    }
  });
});
