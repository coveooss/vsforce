import * as vscode from 'vscode';

export class StatusBarUtil {
  private static loadingAnimation = ["|", "/", "-", "\\"];
  private static loadingAnimationPosition = 0;
  private static intervalId = setInterval(StatusBarUtil.updateLoading, 75);
  private static isLoading: boolean = false;
  private static currentText: string = "[vsforce]";
  private static baseText: string = StatusBarUtil.currentText;
  private static promises: { [text: string]: Thenable<any> } = {}

  private static statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );

  public static init(value: string): vscode.Disposable {
    StatusBarUtil.setText(value);
    StatusBarUtil.statusBarItem.show();

    return {
      dispose: () => {
        StatusBarUtil.statusBarItem.dispose();
        clearInterval(StatusBarUtil.intervalId);
      }
    }
  }

  public static setText(value: string) {
    StatusBarUtil.baseText = value;

    if (!StatusBarUtil.isLoading) {
      StatusBarUtil.setStatusBarItemText(value);
    }
  }

  private static setStatusBarItemText(value: string) {
    StatusBarUtil.currentText = value;
    StatusBarUtil.statusBarItem.text = StatusBarUtil.currentText;
  }

  public static setLoading(value: string, promise: Thenable<any>) {
    StatusBarUtil.isLoading = true;
    StatusBarUtil.currentText = value;

    StatusBarUtil.promises[value] = promise;

    var done = () => {
      delete StatusBarUtil.promises[value];

      if (Object.keys(StatusBarUtil.promises).length == 0) {
        StatusBarUtil.isLoading = false;

        StatusBarUtil.setStatusBarItemText(StatusBarUtil.baseText);
      } else {
        StatusBarUtil.currentText = Object.keys(StatusBarUtil.promises)[Object.keys(StatusBarUtil.promises).length - 1];
      }
    }

    promise.then(done, done);
  }

  private static updateLoading() {
    if (StatusBarUtil.isLoading) {

      StatusBarUtil.statusBarItem.text =
        (StatusBarUtil.isLoading ? StatusBarUtil.loadingAnimation[StatusBarUtil.loadingAnimationPosition] : "") + "\t" + StatusBarUtil.currentText;

      StatusBarUtil.loadingAnimationPosition++;
      if (StatusBarUtil.loadingAnimationPosition >= StatusBarUtil.loadingAnimation.length) {
        StatusBarUtil.loadingAnimationPosition = 0;
      }
    }
  }
}
